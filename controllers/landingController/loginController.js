const Bcrypt = require('bcrypt');
const { pool } = require('../../database/pool');
const { urls } = require('../../routes/urls');

const loginController = async (request, reply) => {
    // get data from client
    const { role, email, password } = request.payload;

    // Non-admins are barred from logging in for a limited time.
    if (!(role === 'admin')) {
        return 'Software is Under Construction!';
    }

    // get role and password from db
    let result = '';
    try {
        result = await pool.query('SELECT * FROM admin');
        result = result.rows; // get only row of data
        [result] = result; // destructuring result without array []
    } catch (e) {
        return 'Data failed to be fetched from the database.';
    }

    // check and compare the data sent by the client
    if (!(email === result.email) || !(await Bcrypt.compare(password, result.password)) || result === '') {
        // set information failed login via flash message
        request.yar.flash(
            'Failed Loggin',
            'Login Gagal. Pastikan Anda Memasukan Email dan Password dengan Benar!',
            );

        // send old value via flash message to repopulate form
        request.yar.flash('oldLoginValue', { role, email, password });
        return reply.redirect(urls.pageLogin);
    }

    // set cookie
    request.cookieAuth.set({ id: result.id });
    return reply.redirect(urls.pageShow);
};

module.exports = { loginController };
