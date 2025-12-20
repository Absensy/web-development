// Базовый класс для всех сущностей (Абстракция)
export abstract class BaseEntity {
  protected id?: number;
  protected createdAt?: Date;
  protected updatedAt?: Date;

  constructor(id?: number, createdAt?: Date, updatedAt?: Date) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Абстрактные методы (должны быть реализованы в дочерних классах)
  abstract validate(): boolean;
  abstract toJSON(): Record<string, unknown>;

  // Общие методы для всех сущностей
  getId(): number | undefined {
    return this.id;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  // Метод для обновления времени изменения
  protected updateTimestamp(): void {
    this.updatedAt = new Date();
  }
}

