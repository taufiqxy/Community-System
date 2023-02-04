const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const addDataController = async (request, h) => {
    const {
        id, namaLengkap, email, alamat,
    } = request.payload;

    try {
        const result = await pool.query(`insert into karyawan values
                                        ('${id}', '${namaLengkap}', '${email}', '${alamat}')`);
        // set success flash message
        request.yar.flash('flashMsg add', {
            status: 'success', msg: 'Data Sukses Ditambahkan!',
        });
        return h.redirect('/admin/add-data-page');
    } catch (err) {
        // set failed flash message
        request.yar.flash('flashMsg add', {
            status: 'failed', msg: 'Data Gagal Ditambah. Periksa Kembali Data Anda!',
        });
        return h.redirect('/admin/add-data-page');
    }
};

module.exports = { addDataController };
