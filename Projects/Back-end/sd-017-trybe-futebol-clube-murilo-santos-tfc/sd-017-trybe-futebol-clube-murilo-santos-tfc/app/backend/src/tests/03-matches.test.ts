import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Buscar partidas', () => {
  it('Retorna as partidas pela /matches', async () => {
    const response = await chai.request(app).get('/matches').send();

    expect(response).to.have.status(200);
  });
});

describe('Cadastrar uma partida com times iguais', () => {
  it('Retorna a mensagem correta', async () => {
    const postMatchObj = {
      homeTeam: 8,
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2
    }

    const response = await chai.request(app).post('/matches').send(postMatchObj);

    expect(response).to.have.status(401);
  });
});

describe('Finalizar uma partida', () => {
  it('Retorna a resposta correta', async () => {
    const response = await chai.request(app).patch('/matches/5/finish').send();

    expect(response).to.have.status(200);
  });
});

describe('Editar uma partida', () => {
  const editMatchObj = {
    homeTeamGoals: 3,
    awayTeamGoals: 1,
  };

  it('Retorna a resposta correta', async () => {
    const response = await chai.request(app).patch('/matches/5').send(editMatchObj);

    expect(response).to.have.status(200);
  });
});