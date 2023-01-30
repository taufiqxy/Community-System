const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const halamanDeleteController = async (request, h) => {
    try {
        const result = await pool.query('SELECT * FROM karyawan');
        const namaKaryawan = result.rows;
        const listKaryawan = namaKaryawan.map((x) => {
            return [x.id, x.nama_lengkap, x.email, x.alamat];
        });
        const flashMsg = request.yar.flash('success delete'); // get flash message
        return h.view('adminArea/delete.njk', { listKaryawan, flashMsg });
    } catch (err) {
        return 'Data gagal diambil';
    }
};

module.exports = { halamanDeleteController };
