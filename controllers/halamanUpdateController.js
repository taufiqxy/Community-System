const nunjucks = require('nunjucks');
const { client } = require('../database/client');
const { pool } = require('../database/pool');

const halamanUpdateController = async (request, h) => {
    try {
        const result = await pool.query('SELECT * FROM karyawan');
        const namaKaryawan = result.rows;
        const listKaryawan = namaKaryawan.map((x) => {
            return [x.id, x.nama_lengkap, x.email, x.alamat];
        });
        const flashMsg = request.yar.flash('success update'); // get flash message
        return nunjucks.render('views/update.njk', { listKaryawan, flashMsg });
    } catch (err) {
        return 'Data gagal diambil';
    }
};

module.exports = { halamanUpdateController };
