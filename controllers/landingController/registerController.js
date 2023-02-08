const baseDirectory = process.cwd();
const fs = require('fs');

const registerController = async (request, h) => {
    const file = request.payload.photoProfile;
    const data = request.payload.name;

    // Save the uploaded file to the file system
    const filePath = `${baseDirectory}/temp/${file.hapi.filename}`;
    const fileStream = fs.createWriteStream(filePath);
    file.pipe(fileStream);

    file.on('end', (err) => {
        if (err) {
            return h.response({ success: false, message: err.message }).code(500);
        }
        return h.response({ success: true });
    });

    return 'ok';
};

module.exports = { registerController };
