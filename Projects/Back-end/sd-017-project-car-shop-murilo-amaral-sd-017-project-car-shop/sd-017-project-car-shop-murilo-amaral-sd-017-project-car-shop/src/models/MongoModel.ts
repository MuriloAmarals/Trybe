import { isValidObjectId, Model } from 'mongoose';
import { ErroTypes } from '../error/catalog';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  #model: Model<T>;

  constructor(model: Model<T>) {
    this.#model = model;
  }

  async create(obj: T): Promise<T> {
    return this.#model.create({ ...obj });
  }

  async read(): Promise<T[]> {
    return this.#model.find();
  }

  async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErroTypes.InvalidMongoId);

    return this.#model.findById(_id);
  }

  async update(_id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErroTypes.InvalidMongoId);

    return this.#model.findOneAndUpdate({ _id }, { ...obj });
  }

  async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErroTypes.InvalidMongoId);

    return this.#model.findOneAndDelete({ _id });
  }
}

export default MongoModel;