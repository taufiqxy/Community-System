const { client } = require('../../database/client');
const { pool } = require('../../database/pool');

const pageEditController = async (request, h) => {
    const { id } = request.params;
    try {
        const result = await pool.query(`SELECT * FROM karyawan where id='${id}'`);
        let aKaryawan = result.rows;
        [aKaryawan] = aKaryawan;
        // const birthDate = {
        //     year: aKaryawan.birth_date.getFullYear(),
        //     month: aKaryawan.birth_date.getMonth() + 1,
        //     day: aKaryawan.birth_date.getDate(),
        // };
        const birthDate = aKaryawan.birth_date.getFullYear().toString()
                        + '-0'.toString()
                        + (aKaryawan.birth_date.getMonth() + 1).toString()
                        + '-0'.toString()
                        + aKaryawan.birth_date.getDate().toString();
        return h.view('adminArea/edit.njk', { id, aKaryawan, birthDate });
    } catch (err) {
        return err;
    }
};

module.exports = { pageEditController };
