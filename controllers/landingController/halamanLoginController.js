const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const halamanLoginController = async (request, h) => {
    const flashMsg = request.yar.flash('Failed Loggin'); // get flash message
    return h.view('landingArea/login.njk', { flashMsg });
};

module.exports = { halamanLoginController };
