const Bcrypt = require('bcrypt');
const Joi = require('joi');
const { pool } = require('../../database/pool');
const { urls } = require('../../routes/urls');

// schema validation with Joi
const schema = Joi.object({
    role: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
});

const loginController = async (request, h) => {
    // get data from client
    const { role, email, password } = await request.payload;

    // validation data with JOI
    const { error } = schema.validate({ role, email, password });
    if (error) {
        // set information failed login via flash message
        request.yar.flash('Failed Loggin', error.message);

        // send old value via flash message to repopulate form
        request.yar.flash('oldLoginValue', { role, email, password });
        return h.redirect(urls.pageLogin);
    }

    // test karyawan profile page
    if (role === 'member') {
        // set cookie
        request.cookieAuth.set({ id: '1' }); // test using admin id
        return h.redirect(urls.pageProfile);
    }

    // Non-admins are barred from logging in for a limited time.
    if (!(role === 'admin')) {
        return 'Software is Under Construction, Temporary Non-admins Role Does Not Allowed!';
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
        return h.redirect(urls.pageLogin);
    }

    // set cookie
    request.cookieAuth.set({ id: result.id });

    return h.redirect(urls.pageShow);
};

module.exports = { loginController };
