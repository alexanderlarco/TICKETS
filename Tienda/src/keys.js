module.exports = {

    database: {
        connectionLimit: 10,
        host: process.env.DATABASE_HOST || 'localhost',
        user: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD || 'ricky0812',
        database: process.env.DATABASE_NAME || 'tickets'
    }

};