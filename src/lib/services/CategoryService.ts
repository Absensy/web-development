import { Category } from '@/lib/models/Category';
import { prisma } from '@/lib/prisma';
import { Category as CategoryType } from '@/lib/db';

// Абстрактный интерфейс для сервиса (Абстракция)
export interface ICategoryService {
  getAll(): Promise<Category[]>;
  getById(id: number): Promise<Category | null>;
  create(categoryData: Partial<CategoryType>): Promise<Category>;
  update(id: number, categoryData: Partial<CategoryType>): Promise<Category>;
  delete(id: number): Promise<boolean>;
}

// Класс-сервис для работы с категориями (Инкапсуляция бизнес-логики)
export class CategoryService implements ICategoryService {
  // Приватный метод для конвертации данных Prisma в объект Category
  private convertToCategory(data: Record<string, unknown>): Category {
    // Преобразуем Date в строки для соответствия CategoryType
    const categoryData: Partial<CategoryType> = {
      ...data,
      created_at: data.created_at instanceof Date ? data.created_at.toISOString() : (data.created_at as string | undefined),
      updated_at: data.updated_at instanceof Date ? data.updated_at.toISOString() : (data.updated_at as string | undefined),
    } as Partial<CategoryType>;
    return new Category(categoryData);
  }

  // Получить все категории
  async getAll(): Promise<Category[]> {
    try {
      const categories = await prisma.category.findMany({
        where: {
          is_active: true
        },
        orderBy: { created_at: 'desc' }
      });

      return categories.map((category: Record<string, unknown>) => this.convertToCategory(category));
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Не удалось получить список категорий');
    }
  }

  // Получить категорию по ID
  async getById(id: number): Promise<Category | null> {
    try {
      const category = await prisma.category.findUnique({
        where: { id }
      });

      if (!category) {
        return null;
      }

      return this.convertToCategory(category);
    } catch (error) {
      console.error('Error fetching category:', error);
      throw new Error('Не удалось получить категорию');
    }
  }

  // Создать новую категорию
  async create(categoryData: Partial<CategoryType>): Promise<Category> {
    try {
      // Создаем объект Category для валидации
      const category = new Category(categoryData);
      
      // Валидируем данные
      if (!category.validate()) {
        throw new Error('Данные категории не прошли валидацию');
      }

      // Сохраняем в БД
      const created = await prisma.category.create({
        data: {
          name: category.getName(),
          price_from: category.getPriceFrom(),
          photo: category.getPhoto(),
          discount: categoryData.discount,
          discounted_price: categoryData.discounted_price
        }
      });

      return this.convertToCategory(created);
    } catch (error) {
      console.error('Error creating category:', error);
      throw error instanceof Error ? error : new Error('Не удалось создать категорию');
    }
  }

  // Обновить категорию
  async update(id: number, categoryData: Partial<CategoryType>): Promise<Category> {
    try {
      const existing = await this.getById(id);
      if (!existing) {
        throw new Error('Категория не найдена');
      }

      // Обновляем объект Category
      if (categoryData.name) existing.setName(categoryData.name);
      if (categoryData.price_from) existing.setPriceFrom(Number(categoryData.price_from));

      // Валидируем
      if (!existing.validate()) {
        throw new Error('Обновленные данные категории не прошли валидацию');
      }

      // Сохраняем в БД
      const updated = await prisma.category.update({
        where: { id },
        data: {
          ...categoryData,
          price_from: categoryData.price_from ? Number(categoryData.price_from) : undefined,
          discount: categoryData.discount ? Number(categoryData.discount) : undefined,
          discounted_price: categoryData.discounted_price ? Number(categoryData.discounted_price) : undefined
        }
      });

      return this.convertToCategory(updated);
    } catch (error) {
      console.error('Error updating category:', error);
      throw error instanceof Error ? error : new Error('Не удалось обновить категорию');
    }
  }

  // Удалить категорию (мягкое удаление)
  async delete(id: number): Promise<boolean> {
    try {
      await prisma.category.update({
        where: { id },
        data: { is_active: false }
      });
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  }
}

