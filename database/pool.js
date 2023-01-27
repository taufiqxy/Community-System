const { Pool } = require('pg');

const pool = new Pool({
    user: 'developer',
    host: 'localhost',
    database: 'companydb',
    password: 'your_password',
    port: 5432,
});

module.exports = { pool };
