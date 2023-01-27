const nunjucks = require('nunjucks');
const { client } = require('../database/client');
const { pool } = require('../database/pool');

const halamanIndexController = async (request, h) => {
    try {
        const result = await pool.query('SELECT * FROM karyawan');
        const namaKaryawan = result.rows;
        const listKaryawan = namaKaryawan.map((x) => {
            return [x.id, x.nama_lengkap, x.email, x.alamat];
        });

        return nunjucks.render('views/index.njk', { list_karyawan: listKaryawan });
    } catch (err) {
        return 'Data gagal diambil';
    }
};

module.exports = { halamanIndexController };
