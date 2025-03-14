require('dotenv').config();
const { Client } = require('pg');

const dbConfig = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.PORT
};

async function queryDB(query, params = []) {
    const client = new Client(dbConfig);
    // console.log(dbConfig); // Debugging
    try {
        await client.connect(); 
        const res = await client.query(query, params);
        return res.rows;
    } catch (err) {
        console.error('DB connection error:', err);
        throw err;
    } finally {
        await client.end();
    }
}

module.exports = { queryDB };
