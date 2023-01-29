const { client } = require('../database/client');
const { pool } = require('../database/pool');

const updateDataController = async (request, h) => {
    const { id } = request.params;
    const { namaLengkap, email, alamat } = request.payload;

    try {
        const result = await pool.query(`UPDATE karyawan SET
                                        nama_lengkap='${namaLengkap}', email='${email}', alamat='${alamat}' 
                                        WHERE id='${id}'`);
        request.yar.flash('success update', 'Data Sukses Diupdate!'); // set flash message
        return h.redirect('/update-data');
    } catch (err) {
        return err;
    }
};

module.exports = { updateDataController };
