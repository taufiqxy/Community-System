const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const halamanRegisterController = async (request, h) => {
    return h.view('landingArea/register.njk');
};

module.exports = { halamanRegisterController };
