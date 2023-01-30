const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const halamanLoginController = async (request, h) => {
    return h.view('landingArea/login.njk');
};

module.exports = { halamanLoginController };
