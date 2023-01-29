const { client } = require('../database/client');
const { pool } = require('../database/pool');

const halamanEditController = async (request, h) => {
    const { id } = request.params;
    try {
        const result = await pool.query(`SELECT * FROM karyawan where id='${id}'`);
        const namaKaryawan = result.rows;
        const listKaryawan = namaKaryawan.map((x) => {
            return [x.id, x.nama_lengkap, x.email, x.alamat];
        });
        // return listKaryawan;
        return h.view('edit.njk', { id, namaKaryawan });
    } catch (err) {
        return err;
    }
};

module.exports = { halamanEditController };
