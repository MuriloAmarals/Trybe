import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { carMock, carMockWithId, carsMock } from '../../mocks/mock';
import { NextFunction, Request, Response } from 'express';
import { ErroTypes } from '../../../error/catalog';
const { expect } = chai;

describe('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon
      .stub(carService, 'create')
      .resolves(carMockWithId);
    sinon
      .stub(carService, 'read')
      .resolves(carsMock);
    sinon
      .stub(carService, 'readOne')
      .onCall(0).resolves(carMock)
      .onCall(1).resolves(null);
    sinon
      .stub(carService, 'update')
      .onCall(0).resolves(carMock)
      .onCall(1).resolves(null);
    sinon
      .stub(carService, 'delete')
      .onCall(0).resolves(carMock)
      .onCall(1).resolves(null);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create', () => {
    it('Sucess', async () => {
      req.body = carMock;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  })
  describe('Find', () => {
    it('Finded', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMock)).to.be.true;
    })
  })
  describe('Find One', () => {
    it('Finded', async () => {
      req.params = '4edd40c86762e0fb12000003' as any;
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    })
    it('Not Finded', async () => {
      try {
        req.params = '4edd40c86762e0fb12000003' as any;
        await carController.readOne(req, res);
      } catch (error: any) {
				expect(error.message).to.be.deep.equal(ErroTypes.NotFound);
      }
    })
  })
  describe('Update', () => {
    it('Sucess', async () => {
      req.body = carMock;
      req.params = '4edd40c86762e0fb12000003' as any;
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
    it('Not Finded', async () => {
      try {
        req.params = '4edd40c86762e0fb12000003' as any;
        await carController.readOne(req, res);
      } catch (error: any) {
				expect(error.message).to.be.deep.equal(ErroTypes.NotFound);
      }
    })
  })
  describe('Deleting One', () => {
    it('Deleted', async () => {
      req.params = '4edd40c86762e0fb12000003' as any;
      await carController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    })
    it('Not Finded', async () => {
      try {
        req.params = '4edd40c86762e0fb12000003' as any;
        await carController.readOne(req, res);
      } catch (error: any) {
				expect(error.message).to.be.deep.equal(ErroTypes.NotFound);
      }
    })
  })
});