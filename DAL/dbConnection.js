const { Pool } = require('pg')

const client = new Pool({
    connectionString: 'postgres://cqbkabwpprswdb:fb314cf470e454f9e381b89d0c03337501e020d52f1111c14d2c78d409c64d8f@ec2-44-199-26-122.compute-1.amazonaws.com:5432/dfgihv8qr5ppl6',
    ssl: {
        rejectUnauthorized: false,
    }
})

module.exports = client