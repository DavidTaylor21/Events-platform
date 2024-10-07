import pkg from 'pg';
const { Pool } = pkg; 
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.PSQL_USERNAME,  
    host: 'localhost',    
    database: process.env.DATABASE, 
    port: 5432,                
});


export default pool;