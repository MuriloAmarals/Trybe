import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  const validUser = {
    email: 'admin@admin.com',
    password: 'secret_admin',
  };

  const invalidUser = {
    email: 'admin@email.com',
    password: '',
  };

  it('Login com sucesso', async () => {
    const response = await chai.request(app).post('/login').send(validUser);

    expect(response).to.have.status(200);
  });

  it('Login com dados inválidos', async () => {
    const response = await chai.request(app).post('/login').send(invalidUser);

    expect(response).to.have.status(400);
  });
});