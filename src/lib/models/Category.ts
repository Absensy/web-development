import { BaseEntity } from './BaseEntity';
import { Category as CategoryType } from '@/lib/db';

// Класс Category наследуется от BaseEntity (Наследование)
export class Category extends BaseEntity {
  private name: string;
  private priceFrom: number;
  private photo: string;
  private discount?: number;
  private discountedPrice?: number;
  private isActive: boolean;

  constructor(data: Partial<CategoryType>) {
    super(data.id, data.created_at ? new Date(data.created_at) : undefined,
          data.updated_at ? new Date(data.updated_at) : undefined);
    
    this.name = data.name || '';
    this.priceFrom = data.price_from ? Number(data.price_from) : 0;
    this.photo = data.photo || '';
    this.discount = data.discount ? Number(data.discount) : undefined;
    this.discountedPrice = data.discounted_price ? Number(data.discounted_price) : undefined;
    this.isActive = data.is_active !== undefined ? data.is_active : true;
  }

  // Реализация абстрактного метода validate (Полиморфизм)
  validate(): boolean {
    if (!this.name || this.name.trim().length === 0) {
      return false;
    }
    if (this.priceFrom < 0) {
      return false;
    }
    if (!this.photo || this.photo.trim().length === 0) {
      return false;
    }
    return true;
  }

  // Реализация абстрактного метода toJSON
  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      price_from: this.priceFrom,
      photo: this.photo,
      discount: this.discount,
      discounted_price: this.discountedPrice,
      is_active: this.isActive,
      created_at: this.createdAt?.toISOString(),
      updated_at: this.updatedAt?.toISOString()
    };
  }

  // Геттеры (Инкапсуляция)
  getName(): string {
    return this.name;
  }

  getPriceFrom(): number {
    return this.priceFrom;
  }

  getPhoto(): string {
    return this.photo;
  }

  getIsActive(): boolean {
    return this.isActive;
  }

  // Сеттеры с валидацией (Инкапсуляция)
  setName(name: string): void {
    if (name.trim().length === 0) {
      throw new Error('Название категории не может быть пустым');
    }
    this.name = name;
    this.updateTimestamp();
  }

  setPriceFrom(price: number): void {
    if (price < 0) {
      throw new Error('Цена от не может быть отрицательной');
    }
    this.priceFrom = price;
    this.updateTimestamp();
  }

  setActive(isActive: boolean): void {
    this.isActive = isActive;
    this.updateTimestamp();
  }
}

