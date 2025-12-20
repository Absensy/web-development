-- Альтернативный скрипт: пересоздание таблицы products с полем image
-- ВНИМАНИЕ: Этот скрипт удалит все существующие данные в таблице products!

-- Создаем резервную копию данных (опционально)
CREATE TABLE products_backup AS SELECT * FROM products;

-- Удаляем существующую таблицу
DROP TABLE IF EXISTS products CASCADE;

-- Создаем таблицу заново с полем image
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    materials TEXT NOT NULL,
    production_time VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    discount INTEGER DEFAULT NULL CHECK (discount >= 0 AND discount <= 100),
    discounted_price DECIMAL(10,2) DEFAULT NULL,
    image VARCHAR(500) NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Восстанавливаем данные из резервной копии (если нужно)
-- INSERT INTO products (name, short_description, full_description, materials, production_time, price, discount, discounted_price, image, category_id)
-- SELECT name, short_description, full_description, materials, production_time, price, discount, discounted_price, 
--        CASE 
--            WHEN id = 1 THEN '/images/singleMonument.jpg'
--            WHEN id = 2 THEN '/images/doubleMonument.jpg'
--            WHEN id = 3 THEN '/images/memorialMonument.jpg'
--            WHEN id = 4 THEN '/images/graniteSlab.jpg'
--            WHEN id = 5 THEN '/images/gravestone.jpg'
--            ELSE '/images/default.jpg'
--        END as image,
--        category_id
-- FROM products_backup;

-- Удаляем резервную копию
-- DROP TABLE products_backup;
