import { Request, Response } from 'express';
import { ErroTypes } from '../error/catalog';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

class CarController {
  #service: IService<ICar>;

  constructor(service: IService<ICar>) {
    this.#service = service;
  }

  create = async (
    req: Request & { body: ICar }, 
    res: Response, 
  ) => {
    const { model, year, color, status, 
      buyValue, seatsQty, doorsQty,
    } = req.body;
    const infoCar = {
      model,
      year,
      color,
      status,
      buyValue,
      seatsQty,
      doorsQty,
    };
    const car = await this.#service.create(infoCar);
    return res.status(201).json(car);
  };

  read = async (_req: Request, res: Response) => {
    const cars = await this.#service.read();
    return res.status(200).json(cars);
  };

  readOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const car = await this.#service.readOne(id);
    if (!car) throw Error(ErroTypes.NotFound);
    return res.status(200).json(car);
  };

  update = async (req: Request & { body: ICar }, res: Response) => {
    const { id } = req.params;
    const { model, year, color, status,
      buyValue, seatsQty, doorsQty,
    } = req.body;
    const infoCar = {
      model,
      year,
      color,
      status,
      buyValue,
      seatsQty,
      doorsQty,
    };
    const car = await this.#service.update(id, infoCar);
    if (!car) throw Error(ErroTypes.NotFound);
    return res.status(200).json(car);
  };
  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const car = await this.#service.delete(id);
    if (!car) throw Error(ErroTypes.NotFound);
    return res.status(204).json({});
  };
}

export default CarController;