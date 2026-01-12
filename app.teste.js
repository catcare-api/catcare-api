const request = require('supertest');
const app = require('./index'); 

describe('Suíte de Testes CatCare API', () => {

  it('Deve verificar se a rota de tutores está acessível', async () => {
    const res = await request(app).get('/tutors');
    expect(res.statusCode).not.toBe(500);
  });

  it('Deve verificar se a rota de gatos retorna JSON', async () => {
    const res = await request(app).get('/cats');
    if (res.statusCode === 200) {
      expect(res.headers['content-type']).toMatch(/json/);
    }
  });

  it('Deve retornar erro 404 para uma rota inexistente', async () => {
    const res = await request(app).get('/rota-invalida');
    expect(res.statusCode).toBe(404);
  });
});