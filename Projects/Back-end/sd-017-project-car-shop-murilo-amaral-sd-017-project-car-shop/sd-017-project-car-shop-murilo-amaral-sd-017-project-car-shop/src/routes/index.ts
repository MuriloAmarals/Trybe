import { Router } from 'express';
import car from './CarRoute';

const route = Router();

route.use('/cars', car);

export default route;