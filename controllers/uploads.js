var fs = require('fs');


module.exports = function(app){
	app.post("/upload/imagem", function(req, res){
		var filename = req.headers.filename;

		console.log(filename);

		req.pipe(fs.createWriteStream('files/'+filename)).on('finish', function(){
			console.log("\n ##### Upload realizado com sucesso ###### \n");
			res.status(201).send("\n ##### Upload ok ###### \n");
		});

	});
}