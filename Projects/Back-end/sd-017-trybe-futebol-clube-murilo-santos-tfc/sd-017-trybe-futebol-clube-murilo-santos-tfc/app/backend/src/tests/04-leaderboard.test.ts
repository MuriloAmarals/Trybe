import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Buscar as classificação dos times da casa', () => {
  it('Retorna o código correto', async () => {
    const response = await chai.request(app).get('/leaderboard/home').send();

    expect(response).to.have.status(200);
  });
});

describe('Buscar as classificação dos times fora da casa', () => {
  it('Retorna o código correto', async () => {

    const response = await chai.request(app).get('/leaderboard/away').send();

    expect(response).to.have.status(200);
  });
});