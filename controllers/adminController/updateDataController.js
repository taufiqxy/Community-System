const { pool } = require('../../database/pool');

const updateDataController = async (request, h) => {
    const { id } = request.params;
    const { name, email, address } = request.payload;

    try {
        const result = await pool.query(`UPDATE karyawan SET
                                        name='${name}', email='${email}', address='${address}' 
                                        WHERE id='${id}'`);
        request.yar.flash('success update', 'Data Sukses Diupdate!'); // set flash message
        return h.redirect('/admin/update-data-page');
    } catch (err) {
        return err;
    }
};

module.exports = { updateDataController };
