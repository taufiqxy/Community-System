const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const halamanAboutController = async (request, h) => {
    return h.view('LandingArea/about.njk');
};

module.exports = { halamanAboutController };
