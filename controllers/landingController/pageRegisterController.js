const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const pageRegisterController = async (request, h) => {
    const flashMsg = request.yar.flash('flashMsg')[0]; // get flash message
    const fieldError = request.yar.flash('fieldError')[0]; // get field error
    const oldValue = request.yar.flash('oldRegisterValue')[0]; // get old value
    return h.view('landingArea/register.njk', { flashMsg, fieldError, oldValue });
};

module.exports = { pageRegisterController };
