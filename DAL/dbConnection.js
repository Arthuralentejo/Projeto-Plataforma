const { Pool } = require('pg')


const client = new Pool({
    connectionString: '',
    ssl: {
        rejectUnauthorized: false,
    }
})

module.exports = client