var fs = require('fs');


fs.readFile('_BOA4738.jpg', function(error, buffer){
	console.log('Arquivo Lido');

	fs.writeFile('_BOA4738_2.jpg', buffer, function(err){
		console.log('Novo arquivo escrito');
	})
});