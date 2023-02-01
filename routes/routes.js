const { halamanIndexController } = require('../controllers/landingController/halamanIndexController');
const { halamanLoginController } = require('../controllers/landingController/halamanLoginController');
const { halamanRegisterController } = require('../controllers/landingController/halamanRegisterController');
const { halamanShowController } = require('../controllers/adminController/halamanShowController');
const { halamanAddController } = require('../controllers/adminController/halamanAddController');
const { halamanUpdateController } = require('../controllers/adminController/halamanUpdateController');
const { halamanDeleteController } = require('../controllers/adminController/halamanDeleteController');
const { halamanEditController } = require('../controllers/adminController/halamanEditController');
const { addDataController } = require('../controllers/adminController/addDataController');
const { updateDataController } = require('../controllers/adminController/updateDataController');
const { deleteDataController } = require('../controllers/adminController/deleteDataController');

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
    },

    // landing page routes
    {
        method: 'GET',
        path: urls.pageIndex,
        handler: halamanIndexController,
    },
    {
        method: 'GET',
        path: urls.pageLogin,
        // handler: halamanLoginController,
        options: {
            auth: {
                mode: 'try',
            },
            plugins: {
                cookie: {
                    redirectTo: false,
                },
            },
            handler: halamanLoginController,
        },

    },
    {
        method: 'GET',
        path: urls.pageRegister,
        handler: halamanRegisterController,
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
        handler: halamanShowController,
    },
    {
        method: 'GET',
        path: urls.pageAdd,
        handler: halamanAddController,
    },
    {
        method: 'GET',
        path: urls.pageUpdate,
        handler: halamanUpdateController,
    },
    {
        method: 'GET',
        path: urls.pageDelete,
        handler: halamanDeleteController,
    },
    {
        method: 'GET',
        path: urls.pageEdit,
        handler: halamanEditController,
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

];

module.exports = { routes };
