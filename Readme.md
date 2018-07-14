PayFast gateway de pagamentos OnLine

Trata-se de uma aplicação para funcionar como um gateway de pagamentos, ou seja, uma plataforma que pode ser utilizada por outros aplicativos para integrar meios de pagamento. Esse sistema faz parte dos exemplos de cenários situacionais que são usados como exercício para aprendizado do aluno no curso avançado sobre NodeJs que é conduzido pela Alura Cursos Online.

Getting Started
Para começar a rodar a aplicação da PayFast em sua máquina inicialmente você precisará:
	- Copie o diretório payfast e cardfast para um diretório de sua preferência.
	- Instale a engine javascript do NodeJS em sua máquina acessando o link https://nodejs.org/en/download/
	- Após instalado o NodeJS abra um terminal e digite node -v que ele deve retornar a versão instalada
	- Confirme se o NPM (Node Package Manager) já está instalado em sua máquina digitando "npm -version
	- Digite em seu terminal o comando "sudo npm install -g nodemon"
	- Instale o MySQL em sua máquina baixando através do link https://dev.mysql.com/downloads/mysql/
	- Assim que rodar o MySQL rode o seguinte comando SQL: 
				============================================
				> create database payfast;
    			
    			> use payfast;
				
				

				> CREATE TABLE pagamentos (
        			id int(11) NOT NULL AUTO_INCREMENT,
			       	forma_de_pagamento varchar(255) NOT NULL,
			       	valor decimal(10,2) NOT NULL,
			       	moeda varchar(3) NOT NULL,
			       	status varchar(255) NOT NULL,
			       	data DATE,
			       	descricao text,
			        PRIMARY KEY (id)
			       );

  				> show tables;

  				============================================

    - Entre no arquivo connectionFactory e entre com o usuário e senha do seu banco de dados em mySQL.
	- No console entre no diretório "payfast" e digite o comando "nodemon index.js"
	senha do seu banco de dados em mySQL.
	- Quando ambos os serviços estiverem de pé digite o seguinte comando no console:
		> curl http://localhost:3000/pagamentos/pagamento -X POST -v -H "Content-type:application/json" -d @files/pagamentos.json | json_pp
	- Consulte o id do pagamento realizado no banco de dados para usá-lo na pesquisa.Para consultar o dado inserido digite:
		> curl -X GET http://localhost:3000/pagamentos/pagamento/<id> -v 


Prerequisites
Você precisará instalar em modo padrão os seguintes softwares:
NodeJS - https://nodejs.org/en/download/
MySQL - https://dev.mysql.com/downloads/



Running the tests
- Os testes foram criados usando a biblioteca do supertest disponível no NPM.
- Para rodar os testes de integração digite o seguinte comando no console:
			NODE_ENV=test node_modules/mocha/bin/mocha	 


- Os testes criados que estão dentro do diretório test no arquivo produtos.js verificam as operações CRUD de produtos disponíveis

- Os testes validam a funcionalidade de cadastro de produtos. Para isso foram escritos dois testes: um para testar o cadastro com dados inválidos e outro com dados válidos.

- Está sendo testada a rota “/produtos”, porém passando o verbo “post”. E para enviar o corpo da requisição, ou seja, o json com os dados do produto, está sendo usada a função send() do objeto do supertest.


		=========================================================================================
		var express = require('../config/express')();
		var request = require('supertest')(express);
		describe('ProdutosController', function(){

			it('#listagem json', function(done){
				request.get('/produtos')
				.set('Accept', 'Application/json')
				.expect('Content-Type',/json/)
				.expect(200,done);
			});

			it('Cadastro de novo produto com dados inválidos', function(done){
				request.post('/produtos')
				.send({titulo:"",descricao:"Novo livro"})
				.expect(400,done);
			});

				it('Cadastro de novo produto com dados válidos', function(done){
				request.post('/produtos')
				.send({titulo:"Livro dos títulos",descricao:"Novo livro dos Títulos", preco:100})
				.expect(302,done);
			});
		});
		=========================================================================================


Built With
    "body-parser": "^1.18.2",
    "consign": "^0.1.6",
    "express": "^4.16.3",
    "express-validator": "^5.1.2",
    "memcached": "^2.2.2",
    "morgan": "^1.9.0",
    "mysql": "^2.15.0",
    "restify": "^7.1.1",
    "restify-clients": "^2.0.2",
    "soap": "^0.24.0",
    "winston": "^2.4.2"


Versioning
Nós usamos o git para versionamento. Para as versões disponíveis, veja as tags no repositório.

Authors
Thiago Moreira - https://github.com/ttrmoreira

