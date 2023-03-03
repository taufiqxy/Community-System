const baseDirectory = process.cwd();
const Joi = require('joi').extend(require('@joi/date'));
const { urls } = require('../../routes/urls');
const { pool } = require('../../database/pool');

// schema validation with Joi
const schema = Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    birthDate: Joi.date()
                .format('YYYY-MM-DD')
                .required(),
    password: Joi.string().required(),
    repassword: Joi.ref('password'),
    codeActivation: Joi.string().required(),
});

const registerController = async (request, h) => {
    // Get Requested Data
    const {
        email,
        name,
        address,
        birthDateDay,
        birthDateMonth,
        birthDateYear,
        password,
        repassword,
        codeActivation,
    } = await request.payload;

    // merge birth date
    const formatedDay = birthDateDay.padStart(2, '0');
    const formatedMonth = birthDateMonth.padStart(2, '0');
    const birthDate = `${birthDateYear}-${formatedMonth}-${formatedDay}`;

    // validate data with joi
    const { error } = schema.validate({
        email,
        name,
        address,
        birthDate,
        password,
        repassword,
        codeActivation,
    });

    if (error) {
        // get field of error
        request.yar.flash('fieldError', {
            name: error.details[0].path[0], msg: error.message,
        });

        // send old value via flash message to repopulate form
        request.yar.flash('oldRegisterValue', {
            email,
            name,
            address,
            birthDateDay,
            birthDateMonth,
            birthDateYear,
            password,
            repassword,
            codeActivation,
        });
        return h.redirect(urls.pageRegister);
    }

    // rm this
    console.log(
        email,
        name,
        address,
        birthDateYear,
        birthDateMonth,
        birthDateDay,
        password,
        repassword,
        codeActivation,
        );
    console.log(birthDate);

    try {
        const result = await pool.query(`INSERT INTO karyawan
                                        (name, email, address, birth_date, password)
                                        VALUES
                                        ('${name}', '${email}', '${address}', TO_DATE('${birthDate}', 'YYYY-MM-DD'), '${password}')`);
        // set success flash message
        request.yar.flash('flashMsg', {
            status: 'success', msg: 'Register Berhasil!',
        });
        return h.redirect('/register');
    } catch (err) {
        // set failed flash message
        request.yar.flash('flashMsg', {
            status: 'failed', msg: 'Register Gagal!',
        });
        console.log(err);
        return h.redirect('/register');
    }
};

module.exports = { registerController };
