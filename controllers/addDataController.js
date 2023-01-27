const nunjucks = require('nunjucks');
const { client } = require('../database/client');
const { pool } = require('../database/pool');

const addDataController = async (request, h) => {
    const {
        id, namaLengkap, email, alamat,
    } = request.payload;

    try {
        const result = await pool.query(`insert into karyawan values
                                        ('${id}', '${namaLengkap}', '${email}', '${alamat}')`);
        request.yar.flash('success add', 'Data Sukses Ditambahkan!'); // set flash message
        return h.redirect('/add-data');
    } catch (err) {
        return err;
    }
};

module.exports = { addDataController };
