PayFast gatewy de pagamentos OnLine

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
&&&& @TODO - Parei aqui &&&&

    - Entre no arquivo connectionFactory e entre com o usuário e senha do seu banco de dados em mySQL.
	- No console entre no diretório "casadocodigo" e digite o comando "nodemon app.js"
	- Acesse o browser e digite na barra de endereços:
			 "http://localhost:3000/" => Site de vendas para visulizar os livros cadastrados;
			 "http://localhost:3000/produtos" => Tela para visualizar a lista de livros cadastrados;
			 "http://localhost:3000/produtos/form" => Tela para cadastrar os livros na livraria on-line;
	- Para rodar os testes de integração digite o seguinte comando no console:
			NODE_ENV=test node_modules/mocha/bin/mocha	 


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

Deployment

- O Deploy pode ser realizado no ambiente do Heroku.
- Baixe o toolbelt da Heroku para facilitar o acesso ao PaaS através do link https://devcenter.heroku.com/articles/heroku-cli
- Depois de instalar digite em seu terminal o comando heroku e todos os serviços disponíveis na toolbelt serão listados.
- Instale o git em sua máquina.
- Com o git instalado, navegamos para o diretório do projeto e executamos o comando:
	> git init
- Adicionamos todos os arquivos com o comando:
	> git add -A
- Agora basta efetuar o commit:
	> git commit -m "casa do código"
- Digite:
	> heroku login 
- Acesse com o seu usuário e senha previamente determinados.
- Voltando aos comandos do Heroku, nós escrevemos para criar a aplicação:
	> heroku apps:create cdc-nodejs-<seu nome> (Isso é para não conflitar com apps com o mesmo nome)
- Inclusive, é apontado o endereço para acessar a aplicação. Portanto, se escrevermos git remote nós verificamos que ele já adicionou a entrada para você poder enviar o seu código para o Heroku.

- Para utilizar o MySQL no Heroku é preciso utilizar um sistema chamado Clear DB que é como se fosse um Heroku, só que funciona para Bancos de dados. O interessante é que não é preciso ter experiência no ClearDB pois o Heroku já abstrai tudo para nós.
	> addons:create cleardb:ignite
- Tendo escrito isso teremos uma variável, a CLEARDB_DATABASE_URL, acompanhada da url do banco de dados. Além disso, o Heroku também cria uma variável de ambiente.

- Para comprovar isso basta escrever: 
	>heroku config <nome da aplicação> 
- Aparecerá uma tela com a CLEARDB_DATABASE_URL. Nessa tela, estão outras informações importantes, o login do banco, a senha, a host do banco e o nome do banco. Ou seja, temos todas as informações necessárias para realizar a conexão.
- Antes de definir as configurações do banco de dados, vamos pensar sobre a tabela do banco de dados. É preciso criá-la. Então, se já temos o MySQL instalado podemos ir no terminal e, independente do sistema, vamos ter o comando mysql na linha de comando ou o programa MySQL Workbench (funciona por interface gráfica). Essa decisão é sua. Como queremos consertar o MySQL, o host que vamos passar no Terminal é o mysql -h e o endereço que foi criado pelo cleardb também adicionamos na mesma linha o user que é uma string e a password:
	> mysql -h us-cdbr-iron-east-03.cleardb.net -u b2d77da8735e14 -p

	> Enter password: e7e23a40 (Esse é apenas de exemplo, pegue o que foi apresentado para você no comando heroku config)
- Ao dar um "Enter" teremos a resposta de que estamos conectados ao MySQL. Para comprovar isso podemos digitar no Terminal, show databases. Poderemos verificar que temos o banco do MySQL e também o criado pelo Heroku! É muito interessante perceber que o Heroku cria e configura nós. Assim, são menos coisas com as quais precisamos nos preocupar.

Falta ainda criar a tabela. Basta digitarmos no Terminal:

			======================================================
			CREATE TABLE produtos (
			    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
			    titulo varchar(255) DEFAULT NULL,
			    descricao text,
			    preco decimal(10,2) DEFAULT NULL
			);
			======================================================
- O que ainda falta é inserir no código do arquivo connectionFactory.js que deixamos em aguardo aquilo que é referente a produção. Vamos inserir no host, user, password e 		database. Lembrando que a informação da senha e o nome da base de dados nós encontramos no caminho heroku config. Teremos o seguinte código:

			======================================================
				// ...

				if(process.env.NODE_ENV == 'production') {
				    return mysql.createConnection({
				            host: 'us-cdbr-iron-east-03.cleardb.net',
				            user:'b2d77da8735e14',
				            password:'e7e23a40',
				            database:'heroku_fa1317dbe7cfacc'
				    });
				}

				// ...
			======================================================

- Faça o commit no git e repita os passos anteriores relacionados ao deploy
- Basta acessar agora a sua aplicação com o endereço gerado pelo heroku	

Built With
	"body-parser": "^1.18.2",
    "ejs": "^2.5.7",
    "express": "^4.16.2",
    "express-load": "^1.1.16",
    "express-validator": "^5.0.3",
    "mysql": "^2.15.0",
    "socket.io": "^2.0.4",
    "mocha": "^5.0.4",
    "supertest": "^3.0.0",
    "node":"8.11.1"

Versioning
Nós usamos o git para versionamento. Para as versões disponíveis, veja as tags no repositório.

Authors
Thiago Moreira - https://github.com/ttrmoreira

