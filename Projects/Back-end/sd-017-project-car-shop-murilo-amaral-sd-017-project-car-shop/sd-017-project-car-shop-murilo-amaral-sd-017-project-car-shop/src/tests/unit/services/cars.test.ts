import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carMock, carMockWithId, carsMock, vehicleMock } from '../../mocks/mock';
import { ZodError } from 'zod';
const { expect } = chai;

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon
      .stub(carModel, 'create')
      .resolves(carMockWithId);
    sinon
      .stub(carModel, 'read')
      .resolves(carsMock);
    sinon
      .stub(carModel, 'readOne')
      .resolves(carMockWithId);
    sinon
      .stub(carModel, 'update')
      .resolves(carMockWithId);
    sinon
      .stub(carModel, 'delete')
      .resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Find', () => {
    it('Successfully finded', async () => {
      const cars = await carService.read();
      expect(cars).to.be.eql(carsMock);
    });
  })
  describe('Find One', () => {
    it('Successfully finded', async () => {
      const car = await carService.readOne('4edd40c86762e0fb12000003');
      expect(car).to.be.eql(carMockWithId);
    });
    it('_id not found', async () => {
      try {
      await carService.readOne('INVALIDID123');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId')
      }
    })
  })
  describe('Deleting', () => {
    it('Successfully deleted', async () => {
      const car = await carService.delete('4edd40c86762e0fb12000003');
      expect(car).to.be.eql(carMockWithId);
    });
    it('_id not found', async () => {
      try {
      await carService.delete('INVALIDID123');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId')
      }
    })
  })
  describe('Creating Car', () => {
    it('Successfully created', async () => {
      const infoCar = await carService.create(carMock);
      expect(infoCar).to.be.eql(carMockWithId);
    });
    it('Failure creating vehicle', async () => {
      try {
        await carService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
    it('Failure creating car', async () => {
      try {
        await carService.create(vehicleMock as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    })
  })
  describe('Updating One', () => {
    it('Successfully updated', async () => {
      const car = await carService.update('4edd40c86762e0fb12000003', carMock);
      expect(car).to.be.eql(carMockWithId);
    });
    it('_id not found', async () => {
      try {
      await carService.update('INVALIDID123', carMock);
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId')
      }
    })
    it('Failure creating vehicle', async () => {
      try {
        await carService.update('4edd40c86762e0fb12000003', {} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
    it('Failure creating car', async () => {
      try {
        await carService.update('4edd40c86762e0fb12000003', vehicleMock as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    })
  })
});