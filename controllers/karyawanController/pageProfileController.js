const { pool } = require('../../database/pool');

const pageProfileController = async (request, h) => {
    // try {
    //     const result = await pool.query('SELECT * FROM karyawan');
    //     const namaKaryawan = result.rows;
    //     const listKaryawan = namaKaryawan.map((x) => {
    //         return [x.id, x.name, x.email, x.address];
    //     });

    //     return h.view('adminArea/show.njk', { list_karyawan: listKaryawan });
    // } catch (err) {
    //     return 'Data gagal diambil';
    // }
    return h.view('memberArea/profile.njk');
};

module.exports = { pageProfileController };
