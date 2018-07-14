{
	"nome":"Mathes",
	"data_nascimento": new Date(1990,01,12),
	"curso": { 
		"nome":"Ciência da Computação"
	},
	"notas": [10.0, 8.0, 4.5],
	"habilidades": [
		{
			"nome":"Inglês",
			"nível":"Avançado"
		},
		{
			"nome":"Jiu-jitsu",
			"nível":"básico"
		}
	]
}


{
	"nome": "Lucas",
	"data_nascimento": new Date(1995,03,27),
	"curso":{
		"nome":"Economia"
	},
	"notas": [9.1, 2.2, 3.0 ],
	"habilidades": [
		{
			"nome":"Espanhol",
			"nível": "Básico"
		},
		{ 
			"nome":"Karatê",
			"nível":"Básico"
		}
	]
}


db.alunos.find({$or:[{"curso.nome": "sistemas de informação"},{"curso.nome":"Ciência da Computação"}],"nome":"Matheus"})

db.alunos.find({"curso.nome" :
	{
		$in: ["sistemas de informação", "Ciência da Computação"]
	}
})

db.alunos.update(
	{
		"_id" : ObjectId("5b27a6da48f12cb91c93570f")
	},
	{
		$set : {
			localizacao : {
				endereco : "Rua Vergueiro, 3185",
				cidade : "São Paulo",
				coordinates : [-23.588213, -46.632356],
				type : "Point"
			}
		}
	}

	)

db.alunos.aggregate([
		{
			$geoNear : {
				near : {
					coordinates : [-23.5640265, -46.6527128],
					type : "Point"
				},
				distanceField : "distancia.calculada",
				spherical : true,
				num : 4,
			}
		},
		{
			skip : 1
		}
	])





