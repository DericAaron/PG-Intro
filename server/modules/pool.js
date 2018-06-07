//require in pg
const pg = require('pg');

//not a function. is element of Pool
const Pool = pg.Pool;

//name of DB
const DATABASE_NAME = 'music';

//configuration
const config = {
    database: DATABASE_NAME,  //The name of the DB to connect to
    host: 'localhost',        //Where the db is located
    port: 5432,               //the port the db is listening on
    max: 10,                  //max number of connections
    idleTimeoutMillis: 30000  //limit of 30 seconds to connect
}

//could also use -- const pool = new pg.Pool(config);
const pool = new Pool(config);

//successful connection
pool.on('connect', (client) => {
    console.log(`Connected to database ${DATABASE_NAME} from ${client}`);   
});

//error connection for clients that have been waiting too long
pool.on('error', (err, client) => {
    console.log(`Error with database connection from ${client}. Error: ${err}`);
    process.exit(-1); //used to exit process
});

module.exports = pool;