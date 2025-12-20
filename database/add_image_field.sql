-- Скрипт для добавления поля image в таблицу products
-- Выполните этот скрипт в Neon Console, если таблица уже создана

-- Добавляем поле image в таблицу products
ALTER TABLE products 
ADD COLUMN image VARCHAR(500) NOT NULL DEFAULT '/images/default.jpg';

-- Обновляем существующие записи с реальными изображениями
UPDATE products SET image = '/images/singleMonument.jpg' WHERE id = 1;
UPDATE products SET image = '/images/doubleMonument.jpg' WHERE id = 2;
UPDATE products SET image = '/images/memorialMonument.jpg' WHERE id = 3;
UPDATE products SET image = '/images/graniteSlab.jpg' WHERE id = 4;
UPDATE products SET image = '/images/gravestone.jpg' WHERE id = 5;

-- Убираем значение по умолчанию (теперь поле обязательное)
ALTER TABLE products 
ALTER COLUMN image DROP DEFAULT;
