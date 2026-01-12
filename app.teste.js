const request = require('supertest');
const app = require('./index'); 

describe('Testes Iniciais CatCare', () => {
  it('Deve responder com status 404 em rotas inexistentes', async () => {
    const res = await request(app).get('/rota-teste');
    expect(res.statusCode).toBe(404);
  });

  it('Deve validar se as dependências estão carregadas', () => {
    expect(app).toBeDefined();
  });
});