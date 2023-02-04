const { pageIndexController } = require('../controllers/landingController/pageIndexController');
const { pageLoginController } = require('../controllers/landingController/pageLoginController');
const { pageRegisterController } = require('../controllers/landingController/pageRegisterController');
const { pageShowController } = require('../controllers/adminController/pageShowController');
const { pageAddController } = require('../controllers/adminController/pageAddController');
const { pageUpdateController } = require('../controllers/adminController/pageUpdateController');
const { pageDeleteController } = require('../controllers/adminController/pageDeleteController');
const { pageEditController } = require('../controllers/adminController/pageEditController');
const { loginController } = require('../controllers/landingController/loginController');
const { addDataController } = require('../controllers/adminController/addDataController');
const { updateDataController } = require('../controllers/adminController/updateDataController');
const { deleteDataController } = require('../controllers/adminController/deleteDataController');
const { logoutController } = require('../controllers/adminController/logoutController');

const { urls } = require('./urls');

const routes = [

    // route to allow access public directory
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public',
                listing: false, // change to false to disable listing public path
            },
        },
        options: {
            auth: false,
        },
    },

    // landing page routes
    {
        method: 'GET',
        path: urls.pageIndex,
        handler: pageIndexController,
        options: {
            auth: false,
        },
    },
    {
        method: 'GET',
        path: urls.pageLogin,
        handler: pageLoginController,
        options: {
            auth: false,
        },
    },
    {
        method: 'GET',
        path: urls.pageRegister,
        handler: pageRegisterController,
        options: {
            auth: false,
        },
    },

    // karyawan routes
    // {
    //     method: 'GET',
    //     path: urls.pageKaryawan,
    //     handler: '',
    // },

    // admin routes
    {
        method: 'GET',
        path: urls.pageShow,
        handler: pageShowController,
    },
    {
        method: 'GET',
        path: urls.pageAdd,
        handler: pageAddController,
    },
    {
        method: 'GET',
        path: urls.pageUpdate,
        handler: pageUpdateController,
    },
    {
        method: 'GET',
        path: urls.pageDelete,
        handler: pageDeleteController,
    },
    {
        method: 'GET',
        path: urls.pageEdit,
        handler: pageEditController,
    },
    {
        method: 'POST',
        path: urls.login,
        handler: loginController,
        options: {
            auth: {
                mode: 'try',
            },
        },
    },
    {
        method: 'POST',
        path: urls.add,
        handler: addDataController,
    },
    {
        method: 'POST',
        path: urls.delete,
        handler: deleteDataController,
    },
    {
        method: 'POST',
        path: urls.update,
        handler: updateDataController,
    },
    {
        method: 'POST',
        path: urls.logout,
        handler: logoutController,
    },

];

module.exports = { routes };
