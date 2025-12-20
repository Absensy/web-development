-- Создание таблицы для хранения контента сайта
CREATE TABLE IF NOT EXISTS content (
    id SERIAL PRIMARY KEY,
    section VARCHAR(100) UNIQUE NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индекса для быстрого поиска по секции
CREATE INDEX IF NOT EXISTS idx_content_section ON content(section);

-- Вставка дефолтных данных для секции "О компании"
INSERT INTO content (section, data) VALUES (
    'about_company',
    '{
        "title": "О нашей компании",
        "description": "Более 15 лет мы создаем памятники, которые хранят память о ваших близких. Наша мастерская оснащена современным оборудованием для обработки натурального камня. Мы работаем только с качественным гранитом и мрамором, предоставляем гарантию на все виды работ и осуществляем установку памятников на кладбищах Москвы и области.",
        "image": "/images/ded.png",
        "advantages": [
            "Качество материалов",
            "Индивидуальный подход",
            "Гарантия и надёжность"
        ]
    }'::jsonb
) ON CONFLICT (section) DO NOTHING;
