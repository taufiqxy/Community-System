const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const pageRegisterController = async (request, h) => {
    return h.view('landingArea/register.njk');
};

module.exports = { pageRegisterController };
