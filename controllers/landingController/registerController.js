const baseDirectory = process.cwd();
const Joi = require('joi');
const fs = require('fs');

// schema validation with Joi
const schema = Joi.object({
    email: Joi.string(),
    name: Joi.string(),
    address: Joi.string(),
    birthDate: Joi.string(),
    password: Joi.string(),
    repassword: Joi.ref('password'),
});

// file validation

const registerController = async (request, h) => {
    // Get Requested Data
    const {
        email, name, address, birthDate, password, repassword,
    } = await request.payload;

    // validate data with joi
    const { error } = schema.validate({
        email, name, address, birthDate, password, repassword,
    });

    if (error) {
        return error.message;
    }

    return 'register berhasil';
};

module.exports = { registerController };
