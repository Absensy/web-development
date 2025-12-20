import { Product } from '@/lib/models/Product';
import { prisma } from '@/lib/prisma';
import { Product as ProductType } from '@/lib/db';

// Абстрактный интерфейс для сервиса (Абстракция)
export interface IProductService {
  getAll(categoryId?: number): Promise<Product[]>;
  getById(id: number): Promise<Product | null>;
  create(productData: Partial<ProductType>): Promise<Product>;
  update(id: number, productData: Partial<ProductType>): Promise<Product>;
  delete(id: number): Promise<boolean>;
}

// Класс-сервис для работы с продуктами (Инкапсуляция бизнес-логики)
export class ProductService implements IProductService {
  // Приватный метод для конвертации данных Prisma в объект Product
  private convertToProduct(data: ProductType): Product {
    return new Product(data);
  }

  // Получить все продукты
  async getAll(categoryId?: number): Promise<Product[]> {
    try {
      const products = await prisma.product.findMany({
        where: {
          is_active: true,
          ...(categoryId ? { category_id: categoryId } : {})
        },
        include: {
          category: {
            select: {
              name: true
            }
          }
        },
        orderBy: { created_at: 'desc' }
      });

      return products.map(product => this.convertToProduct(product as ProductType));
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Не удалось получить список товаров');
    }
  }

  // Получить продукт по ID
  async getById(id: number): Promise<Product | null> {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          category: true
        }
      });

      if (!product) {
        return null;
      }

      return this.convertToProduct(product as ProductType);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Не удалось получить товар');
    }
  }

  // Создать новый продукт
  async create(productData: Partial<ProductType>): Promise<Product> {
    try {
      // Создаем объект Product для валидации
      const product = new Product(productData);
      
      // Валидируем данные
      if (!product.validate()) {
        throw new Error('Данные товара не прошли валидацию');
      }

      // Сохраняем в БД
      const created = await prisma.product.create({
        data: {
          name: product.getName(),
          short_description: productData.short_description || '',
          full_description: productData.full_description || '',
          materials: productData.materials || '',
          production_time: productData.production_time || '',
          price: product.getPrice(),
          discount: productData.discount,
          discounted_price: productData.discounted_price,
          image: product.getImage(),
          category_id: productData.category_id,
          is_new: productData.is_new || false,
          is_popular: productData.is_popular || false,
          is_active: productData.is_active !== undefined ? productData.is_active : true
        }
      });

      return this.convertToProduct(created as ProductType);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error instanceof Error ? error : new Error('Не удалось создать товар');
    }
  }

  // Обновить продукт
  async update(id: number, productData: Partial<ProductType>): Promise<Product> {
    try {
      const existing = await this.getById(id);
      if (!existing) {
        throw new Error('Товар не найден');
      }

      // Обновляем объект Product
      if (productData.name) existing.setName(productData.name);
      if (productData.price) existing.setPrice(Number(productData.price));
      if (productData.discount !== undefined) existing.setDiscount(Number(productData.discount));

      // Валидируем
      if (!existing.validate()) {
        throw new Error('Обновленные данные товара не прошли валидацию');
      }

      // Сохраняем в БД
      const updated = await prisma.product.update({
        where: { id },
        data: {
          ...productData,
          price: productData.price ? Number(productData.price) : undefined,
          discount: productData.discount ? Number(productData.discount) : undefined,
          discounted_price: productData.discounted_price ? Number(productData.discounted_price) : undefined,
          category_id: productData.category_id ? parseInt(String(productData.category_id)) : undefined
        }
      });

      return this.convertToProduct(updated as ProductType);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error instanceof Error ? error : new Error('Не удалось обновить товар');
    }
  }

  // Удалить продукт (мягкое удаление)
  async delete(id: number): Promise<boolean> {
    try {
      await prisma.product.update({
        where: { id },
        data: { is_active: false }
      });
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  }

  // Дополнительные методы бизнес-логики
  async getPopularProducts(limit: number = 10): Promise<Product[]> {
    try {
      const products = await prisma.product.findMany({
        where: {
          is_active: true,
          is_popular: true
        },
        take: limit,
        orderBy: { created_at: 'desc' }
      });

      return products.map(product => this.convertToProduct(product as ProductType));
    } catch (error) {
      console.error('Error fetching popular products:', error);
      throw new Error('Не удалось получить популярные товары');
    }
  }

  async getNewProducts(limit: number = 10): Promise<Product[]> {
    try {
      const products = await prisma.product.findMany({
        where: {
          is_active: true,
          is_new: true
        },
        take: limit,
        orderBy: { created_at: 'desc' }
      });

      return products.map(product => this.convertToProduct(product as ProductType));
    } catch (error) {
      console.error('Error fetching new products:', error);
      throw new Error('Не удалось получить новые товары');
    }
  }
}

