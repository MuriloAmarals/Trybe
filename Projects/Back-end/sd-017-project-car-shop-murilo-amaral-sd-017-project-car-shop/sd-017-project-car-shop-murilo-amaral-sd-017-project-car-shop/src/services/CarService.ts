import { CarSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';
import { VehicleSchema } from '../interfaces/IVehicle';

class CarService implements IService<ICar> {
  #model: IModel<ICar>;
  constructor(model: IModel<ICar>) {
    this.#model = model;
  }

  async create(obj: ICar): Promise<ICar> {
    const parsedVehicle = VehicleSchema.safeParse(obj);
    if (!parsedVehicle.success) throw parsedVehicle.error;
    const parsedCar = CarSchema.safeParse(obj);
    if (!parsedCar.success) throw parsedCar.error;
    return this.#model.create(obj);
  }
  async delete(_id: string): Promise<ICar | null> {
    return this.#model.delete(_id);
  }
  async readOne(_id: string): Promise<ICar | null> {
    return this.#model.readOne(_id);
  }
  async read(): Promise<ICar[]> {
    return this.#model.read();
  }
  async update(_id: string, obj: ICar): Promise<ICar | null> {
    const parsedVehicle = VehicleSchema.safeParse(obj);
    if (!parsedVehicle.success) throw parsedVehicle.error;

    const parsedCar = CarSchema.safeParse(obj);
    if (!parsedCar.success) throw parsedCar.error;

    return this.#model.update(_id, obj);
  }
}

export default CarService;