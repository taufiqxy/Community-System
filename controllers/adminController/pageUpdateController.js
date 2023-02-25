const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const pageUpdateController = async (request, h) => {
    try {
        const result = await pool.query('SELECT * FROM karyawan');
        const namaKaryawan = result.rows;
        const listKaryawan = namaKaryawan.map((x) => {
            return [x.id, x.name, x.email, x.address];
        });
        const flashMsg = request.yar.flash('success update'); // get flash message
        return h.view('adminArea/update.njk', { listKaryawan, flashMsg });
    } catch (err) {
        return 'Data gagal diambil';
    }
};

module.exports = { pageUpdateController };
