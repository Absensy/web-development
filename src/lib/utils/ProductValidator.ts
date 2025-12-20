// Интерфейс для валидатора (Абстракция)
export interface IValidator<T> {
  validate(data: T): ValidationResult;
}

// Результат валидации
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Базовый класс валидатора (Абстракция)
export abstract class BaseValidator<T> implements IValidator<T> {
  protected errors: string[] = [];

  abstract validate(data: T): ValidationResult;

  protected addError(message: string): void {
    this.errors.push(message);
  }

  protected resetErrors(): void {
    this.errors = [];
  }

  protected getResult(): ValidationResult {
    const result = {
      isValid: this.errors.length === 0,
      errors: [...this.errors]
    };
    this.resetErrors();
    return result;
  }
}

// Валидатор для продуктов (Наследование)
export class ProductValidator extends BaseValidator<{
  name?: string;
  price?: number;
  image?: string;
  short_description?: string;
  full_description?: string;
}> {
  validate(data: {
    name?: string;
    price?: number;
    image?: string;
    short_description?: string;
    full_description?: string;
  }): ValidationResult {
    this.resetErrors();

    // Валидация названия
    if (!data.name || data.name.trim().length === 0) {
      this.addError('Название товара обязательно');
    } else if (data.name.length > 255) {
      this.addError('Название товара не должно превышать 255 символов');
    }

    // Валидация цены
    if (data.price === undefined || data.price === null) {
      this.addError('Цена обязательна');
    } else if (data.price <= 0) {
      this.addError('Цена должна быть больше нуля');
    }

    // Валидация изображения
    if (!data.image || data.image.trim().length === 0) {
      this.addError('Изображение товара обязательно');
    }

    // Валидация описания
    if (!data.short_description || data.short_description.trim().length === 0) {
      this.addError('Краткое описание обязательно');
    }

    if (!data.full_description || data.full_description.trim().length === 0) {
      this.addError('Полное описание обязательно');
    }

    return this.getResult();
  }
}

// Валидатор для категорий (Наследование)
export class CategoryValidator extends BaseValidator<{
  name?: string;
  price_from?: number;
  photo?: string;
}> {
  validate(data: {
    name?: string;
    price_from?: number;
    photo?: string;
  }): ValidationResult {
    this.resetErrors();

    // Валидация названия
    if (!data.name || data.name.trim().length === 0) {
      this.addError('Название категории обязательно');
    } else if (data.name.length > 255) {
      this.addError('Название категории не должно превышать 255 символов');
    }

    // Валидация цены
    if (data.price_from === undefined || data.price_from === null) {
      this.addError('Цена от обязательна');
    } else if (data.price_from < 0) {
      this.addError('Цена от не может быть отрицательной');
    }

    // Валидация фото
    if (!data.photo || data.photo.trim().length === 0) {
      this.addError('Фото категории обязательно');
    }

    return this.getResult();
  }
}

