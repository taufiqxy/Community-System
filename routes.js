const { halamanIndexController } = require('./controllers/halamanIndexController');
const { halamanAddController } = require('./controllers/halamanAddController');
const { halamanUpdateController } = require('./controllers/halamanUpdateController');
const { halamanAboutController } = require('./controllers/halamanAboutController');
const { halamanDeleteController } = require('./controllers/halamanDeleteController');
const { halamanEditController } = require('./controllers/halamanEditController');
const { addDataController } = require('./controllers/addDataController');
const { updateDataController } = require('./controllers/updateDataController');
const { deleteDataController } = require('./controllers/deleteDataController');

const routes = [

    // route to allow access public directory
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public',
                listing: true,
            },
        },
    },

    // GET Method
    {
        method: 'GET',
        path: '/',
        handler: halamanIndexController,
    },
    {
        method: 'GET',
        path: '/add-data',
        handler: halamanAddController,
    },
    {
        method: 'GET',
        path: '/update-data',
        handler: halamanUpdateController,
    },
    {
        method: 'GET',
        path: '/delete-data',
        handler: halamanDeleteController,
    },
    {
        method: 'GET',
        path: '/about',
        handler: halamanAboutController,
    },
    {
        method: 'GET',
        path: '/edit/{id}',
        handler: halamanEditController,
    },

    // POST Method
    {
        method: 'POST',
        path: '/add-data',
        handler: addDataController,
    },

    // DELETE or UPDATE Method (DELETE not Support in HTTP, so it temporary has changed as POST)
    {
        method: 'POST',
        path: '/delete-data/{id}',
        handler: deleteDataController,
    },
    {
        method: 'POST',
        path: '/update-data/{id}',
        handler: updateDataController,
    },

];

module.exports = { routes };
