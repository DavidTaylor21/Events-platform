const { Pool } = require('pg');
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
    user: process.env.PSQL_USERNAME,  
    host: 'localhost',    
    database: process.env.DATABASE, 
    port: 5432,                
});


module.exports = pool;