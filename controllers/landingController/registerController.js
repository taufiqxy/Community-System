const baseDirectory = process.cwd();
const Joi = require('joi');
const { urls } = require('../../routes/urls');
const { pool } = require('../../database/pool');

// schema validation with Joi
const schema = Joi.object({
    email: Joi.string(),
    name: Joi.string(),
    address: Joi.string(),
    birthDate: Joi.string(),
    password: Joi.string(),
    repassword: Joi.ref('password'),
    codeActivation: Joi.string(),
});

const registerController = async (request, h) => {
    // Get Requested Data
    const {
        email, name, address, birthDate, password, repassword, codeActivation,
    } = await request.payload;

    // validate data with joi
    const { error } = schema.validate({
        email, name, address, birthDate, password, repassword, codeActivation,
    });

    if (error) {
        // set information failed login via flash message
        request.yar.flash('flashMsg', {
            status: 'failed', msg: error.message,
        });

        // send old value via flash message to repopulate form
        request.yar.flash('oldRegisterValue', {
            email, name, address, birthDate, password, repassword, codeActivation,
        });
        return h.redirect(urls.pageRegister);
    }

    console.log(email, name, address, birthDate, password, repassword, codeActivation); // rm this

    try {
        const result = await pool.query(`insert into karyawan values
                                        ('${codeActivation}', '${name}', '${email}', '${address}')`);
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
        return h.redirect('/register');
    }
};

module.exports = { registerController };
