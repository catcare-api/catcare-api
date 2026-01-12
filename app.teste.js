const request = require('supertest');
const app = require('./index'); 

describe('Testes de Endpoint CatCare', () => {
  it('Deve responder 404 para rotas inexistentes (API Viva)', async () => {
    const res = await request(app).get('/rota-que-nao-existe');
    expect(res.statusCode).toBe(404);
  });

  it('Deve validar se o ambiente é de teste', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });
});