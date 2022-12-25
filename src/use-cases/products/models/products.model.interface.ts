export type Product = {
  id: string;
  name: string;
  price: number;
  advantages: string[];
};

export interface IProductsModel {
  getProducts(): Promise<Product[]>;
  getByName(name: string): Promise<Product | null>;
  getProductById(id: string): Promise<Product | null>;
  createProduct(product: Product): Promise<Product>;
  updateProduct(product: Product, changes: Partial<Product>): Promise<Product>;
  deleteProduct(product: Product): Promise<void>;
}
