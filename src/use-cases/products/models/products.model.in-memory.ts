import { Product, IProductsModel } from '.';

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

  async deleteProduct(id: string): Promise<void> {
    this.products = this.products.filter((product) => {
      return !(product.id === id);
    });
  }

  async updateProduct(id: string, changes: Partial<Product>): Promise<Product> {
    let found;

    this.products = this.products.map((product) => {
      if (product.id === id) {
        const result = { ...product, ...changes };
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
