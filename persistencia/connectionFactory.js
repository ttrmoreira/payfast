var mysql = require('mysql');

function createDBConnection(){
	return mysql.createConnection({
           host: 'localhost',
           user: '<Entre aqui com seu usuário do banco de desenvolvimento>',
           password: '<Entre aqui com sua senha do banco de desenvolvimento>',
             database: 'payfast'
        });
}

module.exports = function() {
    return createDBConnection;
}