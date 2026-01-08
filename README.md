CatCare API - Pessoal

API REST para gerenciamento de tutores, gatos e atendimentos de um petshop/clínica felina.

Tecnologias
- Node.js
- Express
- PostgreSQL
- Docker
- Docker Compose

Como rodar o projeto

^ Usando Docker
docker-compose up

API DISPONIVEL EM:
http://localhost:3000

Endpoints

GET /health → teste de saúde da API

POST /tutors → cria tutor

GET /tutors → lista tutores

POST /cats → cria gato

GET /cats → lista gatos

POST /appointments → cria atendimento

GET /appointments → lista atendimentos
