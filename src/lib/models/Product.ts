import { BaseEntity } from './BaseEntity';
import { Product as ProductType } from '@/lib/db';

// Класс Product наследуется от BaseEntity (Наследование)
export class Product extends BaseEntity {
  private name: string;
  private shortDescription: string;
  private fullDescription: string;
  private materials: string;
  private productionTime: string;
  private price: number;
  private discount?: number;
  private discountedPrice?: number;
  private image: string;
  private categoryId?: number;
  private isNew: boolean;
  private isPopular: boolean;
  private isActive: boolean;

  constructor(data: Partial<ProductType>) {
    super(data.id, data.created_at ? new Date(data.created_at) : undefined, 
          data.updated_at ? new Date(data.updated_at) : undefined);
    
    this.name = data.name || '';
    this.shortDescription = data.short_description || '';
    this.fullDescription = data.full_description || '';
    this.materials = data.materials || '';
    this.productionTime = data.production_time || '';
    this.price = data.price ? Number(data.price) : 0;
    this.discount = data.discount ? Number(data.discount) : undefined;
    this.discountedPrice = data.discounted_price ? Number(data.discounted_price) : undefined;
    this.image = data.image || '';
    this.categoryId = data.category_id;
    this.isNew = data.is_new || false;
    this.isPopular = data.is_popular || false;
    this.isActive = data.is_active !== undefined ? data.is_active : true;
  }

  // Реализация абстрактного метода validate (Полиморфизм)
  validate(): boolean {
    if (!this.name || this.name.trim().length === 0) {
      return false;
    }
    if (this.price <= 0) {
      return false;
    }
    if (!this.image || this.image.trim().length === 0) {
      return false;
    }
    return true;
  }

  // Реализация абстрактного метода toJSON
  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      short_description: this.shortDescription,
      full_description: this.fullDescription,
      materials: this.materials,
      production_time: this.productionTime,
      price: this.price,
      discount: this.discount,
      discounted_price: this.discountedPrice,
      image: this.image,
      category_id: this.categoryId,
      is_new: this.isNew,
      is_popular: this.isPopular,
      is_active: this.isActive,
      created_at: this.createdAt?.toISOString(),
      updated_at: this.updatedAt?.toISOString()
    };
  }

  // Геттеры (Инкапсуляция)
  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getDiscountedPrice(): number {
    return this.discountedPrice || this.price;
  }

  getImage(): string {
    return this.image;
  }

  isOnSale(): boolean {
    return this.discount !== undefined && this.discount > 0;
  }

  // Сеттеры с валидацией (Инкапсуляция)
  setName(name: string): void {
    if (name.trim().length === 0) {
      throw new Error('Название товара не может быть пустым');
    }
    this.name = name;
    this.updateTimestamp();
  }

  setPrice(price: number): void {
    if (price <= 0) {
      throw new Error('Цена должна быть больше нуля');
    }
    this.price = price;
    this.updateTimestamp();
  }

  setDiscount(discount: number): void {
    if (discount < 0 || discount > 100) {
      throw new Error('Скидка должна быть от 0 до 100%');
    }
    this.discount = discount;
    this.discountedPrice = this.price * (1 - discount / 100);
    this.updateTimestamp();
  }

  // Метод для расчета финальной цены
  calculateFinalPrice(): number {
    return this.discountedPrice || this.price;
  }

  // Метод для получения информации о скидке
  getDiscountInfo(): { hasDiscount: boolean; discountPercent: number; originalPrice: number; finalPrice: number } {
    return {
      hasDiscount: this.isOnSale(),
      discountPercent: this.discount || 0,
      originalPrice: this.price,
      finalPrice: this.calculateFinalPrice()
    };
  }
}

