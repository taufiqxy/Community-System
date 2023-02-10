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
    photoProfile: Joi.object({
        buffer: Joi.binary().required(),
        mimetype: Joi.string().valid('image/jpeg').valid('image/png').required(),
    }).required(),
});

const registerController = async (request, h) => {
    // Get Requested Data
    const {
        email, name, address, birthDate, photoProfile, password, repassword,
    } = await request.payload;

    console.log(photoProfile);

    // validate data with joi
    const { error } = schema.validate({
        email, name, address, birthDate, photoProfile, password, repassword,
    });

    if (error) {
        return error.message;
    }

    // Save the uploaded file to the file system
    const filePath = `${baseDirectory}/temp/${photoProfile.hapi.filename}`;
    const fileStream = fs.createWriteStream(filePath);
    photoProfile.pipe(fileStream);

    photoProfile.on('end', (err) => {
        if (err) {
            return h.response({ success: false, message: err.message }).code(500);
        }
        return h.response({ success: true });
    });

    return 'ok';
};

module.exports = { registerController };
