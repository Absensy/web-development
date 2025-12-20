// Абстрактный класс для форматирования цен (Абстракция)
export abstract class PriceFormatter {
  protected currency: string;
  protected locale: string;

  constructor(currency: string = 'BYN', locale: string = 'ru-RU') {
    this.currency = currency;
    this.locale = locale;
  }

  // Абстрактный метод для форматирования (должен быть реализован в дочерних классах)
  abstract format(price: number): string;

  // Общий метод для всех форматтеров
  protected formatNumber(price: number): string {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 0,
    }).format(price);
  }
}

// Конкретная реализация для белорусских рублей (Наследование)
export class BYNPriceFormatter extends PriceFormatter {
  constructor() {
    super('BYN', 'ru-RU');
  }

  // Реализация абстрактного метода (Полиморфизм)
  format(price: number): string {
    return this.formatNumber(price);
  }

  // Дополнительный метод для форматирования со скидкой
  formatWithDiscount(originalPrice: number, discountedPrice: number): string {
    return `${this.format(discountedPrice)} (было ${this.format(originalPrice)})`;
  }
}

// Конкретная реализация для долларов (Наследование)
export class USDPriceFormatter extends PriceFormatter {
  constructor() {
    super('USD', 'en-US');
  }

  // Реализация абстрактного метода (Полиморфизм)
  format(price: number): string {
    return this.formatNumber(price);
  }
}

// Фабрика для создания форматтеров (Factory Pattern)
export class PriceFormatterFactory {
  static create(type: 'BYN' | 'USD' = 'BYN'): PriceFormatter {
    switch (type) {
      case 'USD':
        return new USDPriceFormatter();
      case 'BYN':
      default:
        return new BYNPriceFormatter();
    }
  }
}

