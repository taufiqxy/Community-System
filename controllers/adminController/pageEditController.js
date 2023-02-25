const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const pageEditController = async (request, h) => {
    const { id } = request.params;
    try {
        const result = await pool.query(`SELECT * FROM karyawan where id='${id}'`);
        const aKaryawan = result.rows;
        const listKaryawan = aKaryawan.map((x) => {
            return [x.id, x.name, x.email, x.address, x.birth_date, x.password];
        });
        // return listKaryawan;
        return h.view('adminArea/edit.njk', { id, aKaryawan });
    } catch (err) {
        return err;
    }
};

module.exports = { pageEditController };
