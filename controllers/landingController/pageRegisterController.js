const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const pageRegisterController = async (request, h) => {
    const flashMsg = request.yar.flash('flashMsg'); // get flash message
    const oldValue = request.yar.flash('oldRegisterValue'); // get old value
    return h.view('landingArea/register.njk', { flashMsg, oldValue });
};

module.exports = { pageRegisterController };
