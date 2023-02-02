const logoutController = (request, reply) => {
    request.cookieAuth.clear();
    return reply.redirect('/');
};

module.exports = { logoutController };
