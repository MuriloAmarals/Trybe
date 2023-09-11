import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';
import { carMock, carMockWithId, carsMock } from '../../mocks/mock';
import { ErroTypes } from '../../../error/catalog';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon
      .stub(Model, 'create')
      .resolves(carMockWithId);
    sinon
      .stub(Model, 'find')
      .resolves(carsMock);
    sinon
      .stub(Model, 'findOne')
      .resolves(carMockWithId);
    sinon
      .stub(Model, 'findOneAndUpdate')
      .resolves(carMockWithId);
    sinon
      .stub(Model, 'findOneAndDelete')
      .resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })
  describe('Find', () => {
    it('Successfully finded', async () => {
      const cars = await carModel.read();
      expect(cars).to.be.eql(carsMock);
    });
  })
  describe('Creatiing', () => {
    it('Successfully created', async () => {
      const infoCar = await carModel.create(carMock);
      expect(infoCar).to.be.eql(carMockWithId);
    });
  })
  describe('Updating One', () => {
    it('Successfully updated', async () => {
      const car = await carModel.update('4edd40c86762e0fb12000003', carMock);
      expect(car).to.be.eql(carMockWithId);
    });
    it('_id not found', async () => {
      try {
      await carModel.readOne('INVALIDID123');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
        expect(error).to.be.instanceOf(ErroTypes);
        expect(error.message).to.be.a('string');
      }
    })
  })
  describe('Deleting', () => {
    it('Successfully deleted', async () => {
      const car = await carModel.delete('4edd40c86762e0fb12000003');
      expect(car).to.be.eql(carMockWithId);
    });
    it('_id not found', async () => {
      try {
      await carModel.delete('INVALIDID123');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId')
        expect(error).to.be.instanceOf(ErroTypes);
        expect(error.message).to.be.a('string');
      }
    })
  })
  describe('Find One', () => {
    it('Successfully finded', async () => {
      const car = await carModel.readOne('4edd40c86762e0fb12000003');
      expect(car).to.be.eql(carMockWithId);
    });
    it('_id not found', async () => {
      try {
      await carModel.readOne('INVALIDID123');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId')
        expect(error).to.be.instanceOf(ErroTypes);
        expect(error.message).to.be.a('string');
      }
    })
  })
});