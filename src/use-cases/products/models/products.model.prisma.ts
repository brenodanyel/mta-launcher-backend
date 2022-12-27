import { Product, IProductsModel } from '.';
import { Product as PrismaProduct, ProductAdvantage as PrismaProductAdvantage } from '@prisma/client';
import { client } from '../../../../prisma';

export class PrismaModel implements IProductsModel {
  private convert(input: PrismaProduct & { advantages: PrismaProductAdvantage[]; }): Product {
    return {
      id: input.id,
      active: input.active,
      name: input.name,
      price: input.price,
      advantages: input.advantages.map((advantage) => ({
        id: advantage.id,
        description: advantage.description,
      }))
    };
  }

  async getProducts(): Promise<Product[]> {
    const products = await client.product.findMany({
      include: {
        advantages: true,
      }
    });

    return products.map(this.convert);
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

    return this.convert(product);
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

    return this.convert(product);
  }

  async createProduct(product: Product): Promise<Product> {
    const newProduct = await client.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        advantages: {
          create: product.advantages?.map((advantage) => ({ description: advantage.description })),
        },
      },
      include: {
        advantages: true,
      }
    });

    return this.convert(newProduct);
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
          create: changes.advantages?.map((advantage) => ({ description: advantage.description })),
        }
      },
      include: {
        advantages: true,
      }
    });

    return this.convert(updatedProduct);
  }
}
