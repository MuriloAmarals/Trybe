import { Router } from 'express';
import CarController from '../controllers/CarController';
import CarModel from '../models/CarModel';
import CarService from '../services/CarService';

const factory = () => {
  const model = new CarModel();
  const service = new CarService(model);
  const controller = new CarController(service);

  return controller;
};

const Routes = Router();

Routes.post('/', factory().create);
Routes.get('/', factory().read);
Routes.put('/:id', factory().update);
Routes.get('/:id', factory().readOne);

export default Routes;