export type Product = {
  id: string;
  name: string;
  price: number;
  advantages: { id: string; description: string; }[];
  active: boolean;
};

export interface IProductsModel {
  getProducts(): Promise<Product[]>;
  getByName(name: string): Promise<Product | null>;
  getProductById(id: string): Promise<Product | null>;
  createProduct(product: Product): Promise<Product>;
  updateProduct(id: string, changes: Partial<Product>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
}
