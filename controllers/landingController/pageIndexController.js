const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const pageIndexController = async (request, h) => {
    return h.view('landingArea/index.njk');
};

module.exports = { pageIndexController };
