const { client } = require('../database/client');
const { pool } = require('../database/pool');

const halamanAboutController = async (request, h) => {
    return h.view('about');
};

module.exports = { halamanAboutController };
