const baseDirectory = process.cwd();
const Joi = require('joi');
const { urls } = require('../../routes/urls');

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
        request.yar.flash('failedRegister', error.message);

        // send old value via flash message to repopulate form
        request.yar.flash('oldRegisterValue', {
            email, name, address, birthDate, password, repassword, codeActivation,
        });
        return h.redirect(urls.pageRegister);
    }

    return 'register berhasil';
};

module.exports = { registerController };
