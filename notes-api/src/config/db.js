import pg from "pg";

const {pool}=pg;

const pool = new pool({
    host: process.env.PGHOST, 
    port: process.env.PGHOST,
    user:     process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
});

export default pool;