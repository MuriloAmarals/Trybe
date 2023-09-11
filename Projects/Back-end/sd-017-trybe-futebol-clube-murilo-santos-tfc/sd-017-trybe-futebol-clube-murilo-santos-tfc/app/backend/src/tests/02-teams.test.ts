import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Quando buscar os times', () => {
  it('Retorna os times pelo /teams', async () => {
    const response = await chai.request(app).get('/teams').send();

    expect(response).to.have.status(200);
  });

  it('Retorna os dados do time específico', async () => {
    const response = await chai.request(app).get('/teams/5').send();

    expect(response).to.have.status(200);
  });
});