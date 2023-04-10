Projeto que permite o usuário acompanhar e monitorar seu progresso na academia, permitindo-o anotar detalhes importantes do seu treino como os exercícios, série, repetições, RIR e cargas. O usuário pode facilmente organizar o seu treino com base na data, permitindo a customização que mais lhe adeque. O principal objetivo desse projeto é auxiliar o usuário na progressão de cargas.

## Tecnologias
- React
- Node / Express
- MongoDB

## Funcionalidades: 
- Sistema de login/registro que permite o usuário acessar as funcionalides do projeto, o usuário também pode se deslogar.
- Criar um log de treino com base no músculo e no dia que o treino foi realizado.
- É possível remover um log de treino por completo ou apenas séries específicas.
- Duas línguas disponíveis: Português e inglês.
- Projeto utiliza o banco de dados MongoDB através da biblioteca mongoose.
- Senha criptografada com o bcryptjs para assegurar a segurança do usuário.
- Quando o usuário se loga e é aprovado na autenticação, um token é gerado através da biblioteca jsonwebtoken, que autoriza o usuário acessar as funcionalidades do projeto.
- Possui um sistema de cookies, armazenando o token gerado e permitindo que o usuário não precise se logar novamente caso tenha acessado a página dentro de 24 horas.
- Token armazenado nos cookies do navegador através da biblioteca cookie-parser.
- Projeto implantado na nuvem através do sistema de nuvem Render.
- Uso das bibliotecas seguintes bibliotecas para fornecer segurança ao projeto:
- helmet: responsável pela segurança relacionada aos "http response headers".
- cors: permite o acesso através de domínios diferentes.
- xss-clean: "sanitize the user input".
- express-mongo-sanitize: protege contra injeções maliciosas direcionadas ao MongoDB.

## Live: https://logbook-ux4z.onrender.com

![logbook-ux4z onrender com_(Nest Hub Max) (1)](https://user-images.githubusercontent.com/103163622/231005790-5c0886ca-9ea9-4364-803c-a607a9f1cdac.png)
![logbook-ux4z onrender com_(Nest Hub Max) (2)](https://user-images.githubusercontent.com/103163622/231005818-b11e3dc8-f882-4de5-80d5-28d9a30c0276.png)
![logbook-ux4z onrender com_(Nest Hub Max) (3)](https://user-images.githubusercontent.com/103163622/231005874-17d3c727-a7e6-44e9-8694-f7e5987b5b04.png)

## INSTALLATION
- install dependencies with `npm install` command
- create .env and provide correct values: 
  - MONGO_URI=<YOUR_MONGODB_URL> 
  - JWT_SECRET=<YOUR_JWTSECRET> 
  - JWT_LIFETIME=<e.g. "1d">
  - NODE_ENV=<e.g. "development">
- start the back-end and front-end with 'npm start'
- you should see "Server is listening ..." text
