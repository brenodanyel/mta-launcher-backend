import { Product, IProductsModel } from '.';
import { client } from '../../../../prisma';

export class PrismaModel implements IProductsModel {
  async getProducts(): Promise<Product[]> {
    const products = await client.product.findMany({
      include: {
        advantages: true,
      }
    });

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      advantages: product.advantages.map((advantage) => advantage.description),
      active: product.active,
    }));
  }

  async getByName(name: string): Promise<Product | null> {
    const product = await client.product.findFirst({
      where: { name },
      include: {
        advantages: true,
      }
    });

    if (!product) {
      return null;
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      advantages: product.advantages.map((advantage) => advantage.description),
      active: product.active,
    };
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = await client.product.findFirst({
      where: { id },
      include: {
        advantages: true,
      }
    });

    if (!product) {
      return null;
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      advantages: product.advantages.map((advantage) => advantage.description),
      active: product.active,
    };
  }

  async createProduct(product: Product): Promise<Product> {
    const newProduct = await client.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        advantages: {
          create: product.advantages.map((advantage) => ({
            description: advantage,
          })),
        },
      },
      include: {
        advantages: true,
      }
    });

    return {
      id: newProduct.id,
      name: newProduct.name,
      price: newProduct.price,
      advantages: newProduct.advantages.map((advantage) => advantage.description),
      active: newProduct.active,
    };
  }

  async deleteProduct(id: string): Promise<void> {
    await client.product.delete({
      where: { id }
    });
  }

  async updateProduct(id: string, changes: Partial<Product>): Promise<Product> {
    const updatedProduct = await client.product.update({
      where: { id },
      data: {
        name: changes.name,
        price: changes.price,
        advantages: {
          deleteMany: { productId: id },
          create: changes.advantages?.map((advantage) => ({ description: advantage })),
        }
      },
      include: {
        advantages: true,
      }
    });

    return {
      id: updatedProduct.id,
      name: updatedProduct.name,
      price: updatedProduct.price,
      advantages: updatedProduct.advantages.map((advantage) => advantage.description),
      active: updatedProduct.active,
    };
  }
}
