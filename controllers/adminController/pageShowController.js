const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const pageShowController = async (request, h) => {
    try {
        const result = await pool.query('SELECT * FROM karyawan');
        const namaKaryawan = result.rows;
        const listKaryawan = namaKaryawan.map((x) => {
            return [x.id, x.name, x.email, x.address];
        });

        return h.view('adminArea/show.njk', { list_karyawan: listKaryawan });
    } catch (err) {
        return 'Data gagal diambil';
    }
};

module.exports = { pageShowController };
