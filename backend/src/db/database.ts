import mysql from 'mysql2/promise';

// const password = process.env.PASSWORD

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Kush@1207',
    database: 'techdemo'
});

export default db;