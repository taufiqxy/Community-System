const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const addDataController = async (request, h) => {
    const {
        name, email, address, birthDate, password,
    } = request.payload;

    try {
        const result = await pool.query(`INSERT INTO karyawan
                                        (name, email, address, birth_date, password)
                                        VALUES
                                        ('${name}', '${email}', '${address}', '${birthDate}', '${password}')`);
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
