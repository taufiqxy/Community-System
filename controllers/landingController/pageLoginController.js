const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const pageLoginController = async (request, h) => {
    const flashMsg = request.yar.flash('Failed Loggin'); // get flash message
    const oldLoginValue = request.yar.flash('oldLoginValue'); // get old login value
    return h.view('landingArea/login.njk', { flashMsg, oldLoginValue });
};

module.exports = { pageLoginController };
