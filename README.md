JWT Auth Backend (PostgreSQL)

Este é um backend para autenticação de usuários usando JWT, desenvolvido em Node.js com PostgreSQL.

- Funcionalidades:

Registro e login de usuários.

Autenticação via JWT.

Criptografia de senhas.

- Tecnologias:

Node.js

Express.js

PostgreSQL

JWT

- Como executar:

Clone o repositório:

git clone https://github.com/Druwing/jwt-auth-backend-PostgreSQL-version-cloud-.git

Instale as dependências:

cd jwt-auth-backend-PostgreSQL-version-cloud
npm install

Crie um arquivo .env com as seguintes variáveis:

POSTGRES_URL_LOCAL=SuaURLPostgreSQL

JWT_SECRET=SuaChaveJWT

PORT=3000

Execute o servidor:

npm start
