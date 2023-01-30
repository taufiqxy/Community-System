const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const halamanLandingAdminController = async (request, h) => {
    return h.view('adminArea/profil.njk');
};

module.exports = { halamanLandingAdminController };
