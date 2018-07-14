var memcached = require('memcached');

function createMencachedClient(){
	 var  client = new memcached('localhost:45001',
          {
            retries:10,
            retry:10000,
            remove:true
          });	
	return client;
}


module.exports = function() {
	return createMencachedClient;
}

