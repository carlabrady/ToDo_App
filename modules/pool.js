var Pool = require('pg').Pool;

var config = {
    host: 'localhost',
    port: 5432,
    database: 'carlabrady',
    max: 20
}

var myPool = new Pool(config);

module.exports = myPool;