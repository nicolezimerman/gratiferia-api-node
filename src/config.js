const dotenv = require('dotenv')
dotenv.config()

const dbConfigs = {
    home: {
        client: 'mssql',
        connection: {
            server: '127.0.0.1',
            host: '127.0.0.1',
            user: 'apiort',
            password: 'apiort2019',
            database: 'APITP2'
        }
    }/*,
    ort: {
        client: 'mssql',
        connection: {
            server: 'A-SRV-BDINST',
            host: 'A-SRV-BDINST',
            user: 'BD21A01',
            password: 'BD21A01',
            database: 'BD21A01'
        }
    }*/
}


const srvConfigs = {
    port: process.env.PORT || 8081,
    env: process.env.DB_ENV,
    mode: process.env.MODE
}

module.exports = {
    dbConfig: dbConfigs[srvConfigs.env],
    port: srvConfigs.port,
    mode: srvConfigs.mode
}