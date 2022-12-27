import { v4 as uuidv4 } from 'uuid';
import { InMemoryModel } from './models/products.model.in-memory';
import { IProductsModel } from './models';
import { ConflictError, NotFoundError } from '../../utils/error-handling';
import * as validators from './products.validators';

export class Service {
  constructor(private model: IProductsModel = new InMemoryModel()) {}

  async create(params: validators.Create) {
    await validators.create.parseAsync(params);

    const { name, price, advantages } = params;

    if (await this.model.getByName(name)) {
      throw new ConflictError('Product with this name already exists');
    }

    const product = this.model.createProduct({
      id: uuidv4(),
      name,
      price,
      advantages,
      active: true,
    });

    return product;
  }

  async getAll() {
    return this.model.getProducts();
  }

  async getById(params: validators.GetById) {
    await validators.getById.parseAsync(params);
    const { id } = params;
    return this.model.getProductById(id);
  }

  async update(id: string, params: validators.Update) {
    await validators.update.parseAsync(params);

    if (!(await this.model.getProductById(id))) {
      throw new NotFoundError('Product not found');
    }

    const { name, price, advantages, active } = params;

    if (name) {
      const found = await this.model.getByName(name);
      if (found && found.id !== id) {
        throw new ConflictError('Product with this name already exists');
      }
    }

    return this.model.updateProduct(id, { name, price, advantages, active });
  }

  async delete(params: validators.Delete) {
    await validators._delete.parseAsync(params);

    const { id } = params;

    if (!(await this.model.getProductById(id))) {
      throw new NotFoundError('Product not found');
    }

    return this.model.deleteProduct(id);
  }
}
