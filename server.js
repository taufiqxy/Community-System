const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Yar = require('@hapi/yar');
const Vision = require('@hapi/vision');
const Nunjucks = require('nunjucks');
const Cookie = require('@hapi/cookie');
const Basic = require('@hapi/basic');
const Path = require('path');
const { internals } = require('./dumbData');
const { routes } = require('./routes/routes');

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
            plugin: Yar,
            options: yarOption,
        });
    } catch (err) {
        console.error(err);
    }

    // register vision (vison support saveral templates engine by provide 'views' method,
    // but the template engine has to install separately)
    await server.register(Vision);

    // set view engine (using nunjucks engine configure is more complicated)
    server.views({
        engines: {
            njk: {
                compile: (src, options) => {
                    const template = Nunjucks.compile(src, options.environment, options.filename);

                    return (context) => {
                        return template.render(context);
                    };
                },

                prepare: (options, next) => {
                    // eslint-disable-next-line max-len, no-param-reassign
                    options.compileOptions.environment = Nunjucks.configure(options.path, { watch: false });
                    return next();
                },
            },
        },
        path: `${__dirname}/views`,
    });

    // register cookie
    await server.register(Cookie);

    // authentication
    const validate = async (request, session) => {
        const account = await internals.users.find(
            (user) => (user.id === session.id),
        );

        if (!account) {
            return { isValid: false };
        }

        return { isValid: true, credentials: account };
    };

    server.auth.strategy('myAuth', 'cookie', {
        cookie: {
            name: 'sid-example',
            password: 'secret-key-password-for-security',
            isSecure: false,
        },
        redirectTo: '/login',
        validate,
    });

    server.auth.default('myAuth');

    // set router
    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

// run server
init();
