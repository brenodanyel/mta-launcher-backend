import { Product, IProductsModel } from './products.model.interface';

export class InMemoryModel implements IProductsModel {
  private products: Product[] = [];

  async getProducts(): Promise<Product[]> {
    return this.products;
  }

  async getByName(name: string): Promise<Product | null> {
    return this.products.find((product) => product.name === name) || null;
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.products.find((product) => product.id === id) || null;
  }

  async findProductById(id: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id) || null;
    return product;
  }

  async createProduct(product: Product): Promise<Product> {
    this.products.push(product);
    return product;
  }

  async deleteProduct(product: Product): Promise<void> {
    this.products = this.products.filter((_product) => {
      return !(product.id === _product.id);
    });
  }

  async updateProduct(product: Product, changes: Partial<Product>): Promise<Product> {
    let found;

    this.products = this.products.map((_product) => {
      if (product.id === _product.id) {
        const result = { ..._product, ...changes };
        found = result;
        return result;
      }

      return product;
    });

    if (!found) {
      throw new Error('Product not found!');
    }

    return found;
  }
}
