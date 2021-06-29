require('dotenv').config()

const config = {
    env: process.env.ENV || 'dev',
    port: process.env.APP_PORT || 4000,
    secret: process.env.APP_SECRET_KEY || 'sircle1',
    db: {
        connection: process.env.DB_CONNECTION || 'mysql',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_DATABASE || 'sircle1_dev',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || ''
    }
}

module.exports = config
