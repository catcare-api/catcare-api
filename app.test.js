jest.setTimeout(30000);

const request = require('supertest');
const app = require('./src/index');
const pool = require('./src/db/connection');

describe('Testes de Integração com Banco Real', () => {

  afterAll(async () => {
    await pool.end();
  });

  it('Deve criar um tutor seguindo o esquema do banco', async () => {
    const res = await request(app)
      .post('/tutors')
      .send({
        nome: "Maria Oliveira",
        email: `maria${Date.now()}@teste.com`,
        telefone: "88912345678"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.nome).toBe("Maria Oliveira");
  });

  it('Deve falhar ao tentar criar um agendamento para um gato inexistente', async () => {
    const res = await request(app)
      .post('/appointments')
      .send({
        cat_id: 9999,
        data_consulta: new Date(),
        descricao: "Consulta de rotina"
      });

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

});
