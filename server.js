const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const yar = require('@hapi/yar');
const Path = require('path');
const { routes } = require('./routes');

// yar pluggin setting
const yarOption = {
    storeBlank: false,
    cookieOptions: {
        password: 'the-password-must-be-at-least-32-characters-long', // replace with: process.env.SECRET_KEY
        isSecure: true,
    },
};

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
              origin: ['*'],
            },
        },
    });

    // register pluggin Inert (to allow access pulic or asset directory)
    try {
        await server.register(Inert);
    } catch (err) {
        console.error(err);
    }

    // register pluggin yar (hapi session manager)
    try {
        await server.register({
            plugin: yar,
            options: yarOption,
        });
    } catch (err) {
        console.error(err);
    }

    // set router
    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

// run server
init();
