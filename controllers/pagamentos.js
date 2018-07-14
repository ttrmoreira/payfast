var logger = require('../servicos/logger.js')

module.exports = function(app){
	
	app.get('/pagamentos', function(req, res){
		
		console.log('Recebida requisicao de teste na porta 3000.')

		res.send('OK.');

	});

	app.get('/pagamentos/pagamento/:id', function(req, res){
		var id = req.params.id;

    	console.log('Consultando pagamento no memcached: ' + id);
    	logger.info('Consultando pagamento no memcached: ' + id);

    	var memcachedClient = app.servicos.memCachedClient();	

    	memcachedClient.get('pagamento-' + id, function(erro, retorno){

    		if(erro || !retorno){
    			console.log('MISS - chave nao encontrada');
    			
    			var connection = app.persistencia.connectionFactory();
				var pagamentoDAO = new app.persistencia.PagamentoDAO(connection);

				pagamentoDAO.buscaPorId(id, function(erro, resultado){
					if(erro){
						console.log("Erro ao pesquisar o pagamento: "+id);
						res.status(500).send(erro);
						return;
					}

					console.log('Busca por pagamento '+id+' realizada com sucesso!');
					console.log("Pagamento encontrado com sucesso: " +JSON.stringify(resultado));
					res.status(201).json(resultado);
					return;

				});
    		}else{
    			console.log('HIT - valor: ' + JSON.stringify(retorno));
        		res.json(retorno);
        		return;
    		}
    	});

	});

	 app.delete('/pagamentos/pagamento/:id', function(req, res){
	 	var pagamento = {};
		var id = req.params.id;

		pagamento.id = id;
		pagamento.status = 'CANCELADO';

		var connection = app.persistencia.connectionFactory();
		var pagamentoDAO = new app.persistencia.PagamentoDAO(connection);

		pagamentoDAO.atualiza(pagamento, function(erro){
			
			if(erro){
				res.status(500).send(erro);
				console.log(erro);
				return;
			}

			console.log('Pagamento cancelado');
			res.status(204).send(pagamento);

		});

	 });	

	app.put('/pagamentos/pagamento/:id', function(req, res){
		
		var pagamento = {};
		var id = req.params.id;

		pagamento.id = id;
		pagamento.status = 'CONFIRMADO';

		var connection = app.persistencia.connectionFactory();
		var pagamentoDAO = new app.persistencia.PagamentoDAO(connection);

		pagamentoDAO.atualiza(pagamento, function(erro){
			
			if(erro){
				res.status(500).send(erro);
				console.log(erro);
				return;
			}

			console.log('Pagamento confirmado');
			res.status(202).send(pagamento);

		});


	});

	function respostaHypermedia(pagamento, cartao)
	{

		var jsonHypermedia;
		if(cartao != null){

		 	jsonHypermedia = [{
						dados_do_pagamento: pagamento
						}, 
						{
							dados_cartao: cartao
						},
						{
							href: "http://localhost:3000/pagamentos/pagamento/"
								+pagamento.id,
							rel: "CONFIRMAR",
							method: "PUT"
						},
						{
							href: "http://localhost:3000/pagamentos/pagamento/"
								+pagamento.id,
							rel: "CANCELAR",
							method: "DELETE"
						}]
			}else{
				jsonHypermedia = [{
							dados_do_pagamento: pagamento
						}, 
						{
							href: "http://localhost:3000/pagamentos/pagamento/"
								+pagamento.id,
							rel: "CONFIRMAR",
							method: "PUT"
						},
						{
							href: "http://localhost:3000/pagamentos/pagamento/"
								+pagamento.id,
							rel: "CANCELAR",
							method: "DELETE"
						}]
			}
		

		return jsonHypermedia;
	}

	app.post('/pagamentos/pagamento', function(req, res){

		var pagamento = req.body["pagamento"];
		console.log(pagamento);
		console.log("Processando a requisição de um novo pagamento");
		
		pagamento.status = "CRIADO";
		pagamento.data = new Date;
		
		req.assert("pagamento.forma_de_pagamento", "Forma de pagamento é obrigatória.").notEmpty();
        req.assert("pagamento.valor", "Valor é obrigatório e deve ser um decimal.").notEmpty().isFloat();
        req.assert("pagamento.moeda", "Moeda é obrigatória e deve ter 3 caracteres").notEmpty().len(3,3);
        
        var errors = req.validationErrors();

        if(errors){
        	
        	console.log("Erros de validação encontrados");
            res.status(400).send(errors);
            return;
       
        }else{
       		
       		var connection = app.persistencia.connectionFactory();
			var pagamentoDAO = new app.persistencia.PagamentoDAO(connection);
			
			pagamentoDAO.salva(pagamento, function(erro, resultado){

				if(pagamento.forma_de_pagamento == 'cartao'){

					var cartao = req.body["cartao"];
					var clienteCartoes = new app.servicos.cartoesClient(); 
					
					clienteCartoes.autoriza(cartao, function(exception,request, response, retorno){

						if(exception){
							console.log(exception);
							res.status(400).send(retorno);
							return;
						}
						pagamento.id = resultado.insertId;
						response = respostaHypermedia(pagamento, cartao);

						
						console.log('pagamento criado: ' + JSON.stringify(pagamento));
	        			res.location('/pagamentos/pagamento/' + pagamento.id);
						res.status(201).json(response);
						
					});
					
		
				} else{ 

					if(erro){
				
						console.log("Erro ao inserir dados no banco "+erro);
						res.status(500).send(erro);
			
					}else{
					
						pagamento.id = resultado.insertId;
						var response = respostaHypermedia(pagamento, null);


						console.log('pagamento criado: ' + pagamento);
	        			res.location('/pagamentos/pagamento/' + pagamento.id);
	        			console.log(cartao);
	        			res.status(201).json(response);
					}	
				}
		        

		        // ISERINDO NO CACHE
		        var cache = app.servicos.memCachedClient();
		        pagamento.id = resultado.insertId;
		        console.log(cache);
		        console.log('###########Em cache############');
		        console.log(pagamento.id);
		        console.log(JSON.stringify(pagamento));
		        console.log('#######################');
		        cache.set('pagamento-' + pagamento.id, pagamento, 100000, function (err) {
		           console.log('nova chave: pagamento-' + pagamento.id);
		         });
				
			});
        }

	});
}

