const Bcrypt = require('bcrypt');
const { internals } = require('../../dumbData');
const { urls } = require('../../routes/urls');

const loginController = async (request, reply) => {
    const { role, email, password } = request.payload;
    const account = internals.users.find((user) => user.email === email);

    if (!account || !(await Bcrypt.compare(password, account.password))) {
        // set information failed login via flash message
        request.yar.flash(
            'Failed Loggin',
            'Login Gagal. Pastikan Memasukan Email dan password Anda dengan Benar!',
            );

        // send old value via flash message to repopulate form
        request.yar.flash('oldLoginValue', { role, email, password });
        return reply.redirect(urls.pageLogin);
    }

    // set cookie
    request.cookieAuth.set({ id: account.id });
    return reply.redirect(urls.pageShow);
};

module.exports = { loginController };
