var mysql = require('mysql');

function createDBConnection(){
	return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'zx4d98pio',
            database: 'payfast'
        });
}

module.exports = function() {
    return createDBConnection;
}