const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const deleteDataController = async (request, h) => {
    const { id } = request.params;
    try {
        const result = await pool.query(`DELETE FROM karyawan WHERE id='${id}'`);
        request.yar.flash('success delete', 'Data Sukses Dihapus!'); // set flash message
        return h.redirect('/admin/delete-data-page');
    } catch (err) {
        return err;
    }
};

module.exports = { deleteDataController };
