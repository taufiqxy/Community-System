const { Client } = require('pg');

const client = new Client({
    user: 'developer',
    host: 'localhost',
    database: 'companydb',
    password: 'your_password',
    port: 5432,
});

module.exports = { client };
