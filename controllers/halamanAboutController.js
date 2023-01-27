const nunjucks = require('nunjucks');
const { client } = require('../database/client');
const { pool } = require('../database/pool');

const halamanAboutController = async (request, h) => {
    return nunjucks.render('views/about.njk');
};

module.exports = { halamanAboutController };
