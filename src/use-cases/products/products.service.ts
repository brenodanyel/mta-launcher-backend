import { v4 as uuidv4 } from 'uuid';
import { InMemoryModel } from './models/products.model.in-memory';
import { IProductsModel } from './models/products.model.interface';
import { ConflictError } from '../../utils/error-handling';
import * as validators from './products.validators';

export class Service {
  constructor(
    private model: IProductsModel = new InMemoryModel()
  ) { }

  async create(params: validators.Create) {
    await validators.create.parseAsync(params);

    const { name, price, advantages } = params;

    if (await this.model.getByName(name)) {
      throw new ConflictError('Product with this name already exists');
    }

    const product = this.model.createProduct({
      id: uuidv4(),
      name, price, advantages,
    });

    return product;
  }

  async getAll() {
    return this.model.getProducts();
  }

  async getById(id: string) {
    return this.model.getProductById(id);
  }
}
