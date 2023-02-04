const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const pageAddController = (request, h) => {
    const flashMsg = request.yar.flash('success add'); // get flash message
    return h.view('adminArea/add.njk', { flashMsg });
};

module.exports = { pageAddController };
