import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Очищаем все данные из БД
  console.log('Clearing existing data...')
  await prisma.examplesOurWork.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.contactInfo.deleteMany()
  console.log('Database cleared successfully')

  // Создаем контактную информацию
  console.log('Creating contact info...')
  await prisma.contactInfo.create({
    data: {
      address: 'пр. Янки Купалы 22а, цокольный этаж',
      phone: '+375 (29) 708-21-11',
      email: 'info@granite-memory.by',
      instagram: 'granit.grodno',
      working_hours: 'Пн-Пт: 9:00 - 18:00, Сб-Вс: 10:00 - 16:00'
    }
  })
  console.log('Contact info created successfully')

  // Создаем категории
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Памятники одинарные',
        price_from: 1500.00,
        photo: '/images/singleMonument.jpg',
        discount: 10,
        discounted_price: 1350.00
      }
    }),
    prisma.category.create({
      data: {
        name: 'Памятники двойные',
        price_from: 2500.00,
        photo: '/images/doubleMonument.jpg',
        discount: 15,
        discounted_price: 2125.00
      }
    }),
    prisma.category.create({
      data: {
        name: 'Мемориальные комплексы',
        price_from: 3500.00,
        photo: '/images/memorialMonument.jpg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Гранитные плиты',
        price_from: 800.00,
        photo: '/images/graniteSlab.jpg',
        discount: 5,
        discounted_price: 760.00
      }
    }),
    prisma.category.create({
      data: {
        name: 'Надгробные плиты',
        price_from: 1200.00,
        photo: '/images/gravestone.jpg'
      }
    })
  ])

  console.log('Created categories:', categories.length)

  // Создаем товары
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Памятник "Классик"',
        short_description: 'Классический памятник из черного гранита с золотой гравировкой',
        full_description: 'Элегантный памятник в классическом стиле из высококачественного черного гранита. Включает золотую гравировку имени и дат, а также декоративные элементы. Подходит для любого типа захоронения.',
        materials: 'Черный гранит, Золотая фольга',
        production_time: '7-10 дней',
        price: 1800.00,
        discount: 10,
        discounted_price: 1620.00,
        image: '/images/singleMonument.jpg',
        category_id: categories[0].id,
        is_new: false,
        is_popular: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Памятник "Семейный"',
        short_description: 'Двойной памятник для семейных захоронений',
        full_description: 'Просторный двойной памятник из серого гранита с возможностью размещения двух имен. Включает общую эпитафию и декоративные элементы. Идеально подходит для семейных захоронений.',
        materials: 'Серый гранит, Бронза',
        production_time: '10-14 дней',
        price: 2800.00,
        discount: 15,
        discounted_price: 2380.00,
        image: '/images/doubleMonument.jpg',
        category_id: categories[1].id,
        is_new: true,
        is_popular: false
      }
    }),
    prisma.product.create({
      data: {
        name: 'Мемориал "Вечность"',
        short_description: 'Монументальный мемориальный комплекс',
        full_description: 'Величественный мемориальный комплекс из красного гранита с декоративными колоннами и барельефами. Включает постамент, основную стелу и декоративные элементы. Создан для увековечивания памяти особо важных людей.',
        materials: 'Красный гранит, Мрамор, Бронза',
        production_time: '21-30 дней',
        price: 4500.00,
        discount: 20,
        discounted_price: 3600.00,
        image: '/images/memorialMonument.jpg',
        category_id: categories[2].id,
        is_new: false,
        is_popular: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Плита "Простота"',
        short_description: 'Простая гранитная плита для скромных захоронений',
        full_description: 'Минималистичная гранитная плита из серого гранита. Чистые линии и простота дизайна подчеркивают достоинство и скромность. Подходит для тех, кто предпочитает простоту и элегантность.',
        materials: 'Серый гранит',
        production_time: '3-5 дней',
        price: 900.00,
        discount: 5,
        discounted_price: 855.00,
        image: '/images/graniteSlab.jpg',
        category_id: categories[3].id,
        is_new: true,
        is_popular: false
      }
    }),
    prisma.product.create({
      data: {
        name: 'Надгробие "Традиция"',
        short_description: 'Традиционное надгробие с религиозными символами',
        full_description: 'Традиционное надгробие из белого мрамора с выгравированными религиозными символами. Включает крест и молитвенную надпись. Создано в соответствии с православными традициями.',
        materials: 'Белый мрамор, Золотая фольга',
        production_time: '5-7 дней',
        price: 1400.00,
        image: '/images/gravestone.jpg',
        category_id: categories[4].id,
        is_new: false,
        is_popular: false
      }
    }),
    // Дополнительные товары
    prisma.product.create({
      data: {
        name: 'Памятник "Элегант"',
        short_description: 'Элегантный памятник из белого мрамора',
        full_description: 'Утонченный памятник из белого мрамора с изящными линиями и декоративными элементами. Создан для тех, кто ценит красоту и изысканность.',
        materials: 'Белый мрамор, Бронза',
        production_time: '8-12 дней',
        price: 2200.00,
        discount: 12,
        discounted_price: 1936.00,
        image: '/images/singleMonument.jpg',
        category_id: categories[0].id,
        is_new: true,
        is_popular: false
      }
    }),
    prisma.product.create({
      data: {
        name: 'Памятник "Дуэт"',
        short_description: 'Двойной памятник в современном стиле',
        full_description: 'Современный двойной памятник с минималистичным дизайном. Идеально подходит для молодых семей, предпочитающих современный стиль.',
        materials: 'Черный гранит, Стекло',
        production_time: '12-16 дней',
        price: 3200.00,
        image: '/images/doubleMonument.jpg',
        category_id: categories[1].id,
        is_new: false,
        is_popular: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Мемориал "Память"',
        short_description: 'Мемориальный комплекс с колоннами',
        full_description: 'Величественный мемориальный комплекс с декоративными колоннами и барельефами. Создан для увековечивания памяти выдающихся людей.',
        materials: 'Красный гранит, Мрамор',
        production_time: '25-35 дней',
        price: 5200.00,
        discount: 15,
        discounted_price: 4420.00,
        image: '/images/memorialMonument.jpg',
        category_id: categories[2].id,
        is_new: false,
        is_popular: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Плита "Минимал"',
        short_description: 'Минималистичная гранитная плита',
        full_description: 'Простая и элегантная гранитная плита в минималистичном стиле. Подходит для тех, кто предпочитает простоту и лаконичность.',
        materials: 'Серый гранит',
        production_time: '2-4 дня',
        price: 750.00,
        image: '/images/graniteSlab.jpg',
        category_id: categories[3].id,
        is_new: true,
        is_popular: false
      }
    }),
    prisma.product.create({
      data: {
        name: 'Надгробие "Вера"',
        short_description: 'Надгробие с православным крестом',
        full_description: 'Традиционное надгробие с выгравированным православным крестом и молитвенной надписью. Создано в соответствии с православными традициями.',
        materials: 'Белый мрамор, Золотая фольга',
        production_time: '6-8 дней',
        price: 1600.00,
        discount: 8,
        discounted_price: 1472.00,
        image: '/images/gravestone.jpg',
        category_id: categories[4].id,
        is_new: false,
        is_popular: false
      }
    }),
    prisma.product.create({
      data: {
        name: 'Памятник "Премиум"',
        short_description: 'Премиум памятник из черного гранита',
        full_description: 'Эксклюзивный памятник из высококачественного черного гранита с золотой гравировкой и декоративными элементами. Создан для особых случаев.',
        materials: 'Черный гранит, Золотая фольга, Бронза',
        production_time: '10-14 дней',
        price: 3500.00,
        image: '/images/singleMonument.jpg',
        category_id: categories[0].id,
        is_new: false,
        is_popular: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Памятник "Гармония"',
        short_description: 'Двойной памятник в стиле ар-деко',
        full_description: 'Элегантный двойной памятник в стиле ар-деко с геометрическими узорами и декоративными элементами. Создан для ценителей искусства.',
        materials: 'Серый гранит, Мрамор, Бронза',
        production_time: '15-20 дней',
        price: 3800.00,
        discount: 18,
        discounted_price: 3116.00,
        image: '/images/doubleMonument.jpg',
        category_id: categories[1].id,
        is_new: true,
        is_popular: false
      }
    }),
    prisma.product.create({
      data: {
        name: 'Мемориал "Величие"',
        short_description: 'Монументальный мемориальный комплекс',
        full_description: 'Величественный мемориальный комплекс с декоративными колоннами, барельефами и скульптурными элементами. Создан для увековечивания памяти великих людей.',
        materials: 'Красный гранит, Мрамор, Бронза, Золотая фольга',
        production_time: '30-45 дней',
        price: 6500.00,
        image: '/images/memorialMonument.jpg',
        category_id: categories[2].id,
        is_new: false,
        is_popular: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Плита "Классик"',
        short_description: 'Классическая гранитная плита',
        full_description: 'Традиционная гранитная плита в классическом стиле с простыми линиями и элегантным дизайном. Подходит для любого типа захоронения.',
        materials: 'Серый гранит',
        production_time: '4-6 дней',
        price: 950.00,
        discount: 10,
        discounted_price: 855.00,
        image: '/images/graniteSlab.jpg',
        category_id: categories[3].id,
        is_new: false,
        is_popular: false
      }
    }),
    prisma.product.create({
      data: {
        name: 'Надгробие "Надежда"',
        short_description: 'Надгробие с ангелом-хранителем',
        full_description: 'Трогательное надгробие с изображением ангела-хранителя и молитвенной надписью. Создано для тех, кто верит в вечную жизнь.',
        materials: 'Белый мрамор, Золотая фольга',
        production_time: '7-10 дней',
        price: 1800.00,
        image: '/images/gravestone.jpg',
        category_id: categories[4].id,
        is_new: true,
        is_popular: false
      }
    }),
    prisma.product.create({
      data: {
        name: 'Памятник "Современник"',
        short_description: 'Современный памятник с LED-подсветкой',
        full_description: 'Инновационный памятник с встроенной LED-подсветкой и современным дизайном. Создан для тех, кто ценит современные технологии.',
        materials: 'Черный гранит, Стекло, Металл',
        production_time: '14-18 дней',
        price: 4200.00,
        discount: 20,
        discounted_price: 3360.00,
        image: '/images/singleMonument.jpg',
        category_id: categories[0].id,
        is_new: true,
        is_popular: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Памятник "Единство"',
        short_description: 'Двойной памятник с общим основанием',
        full_description: 'Уникальный двойной памятник с общим основанием и раздельными стелами. Символизирует единство и вечную любовь.',
        materials: 'Серый гранит, Мрамор',
        production_time: '16-22 дня',
        price: 4100.00,
        image: '/images/doubleMonument.jpg',
        category_id: categories[1].id,
        is_new: false,
        is_popular: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Мемориал "Слава"',
        short_description: 'Мемориальный комплекс с вечным огнем',
        full_description: 'Величественный мемориальный комплекс с вечным огнем и декоративными элементами. Создан для увековечивания памяти героев.',
        materials: 'Красный гранит, Мрамор, Бронза, Металл',
        production_time: '35-50 дней',
        price: 7500.00,
        image: '/images/memorialMonument.jpg',
        category_id: categories[2].id,
        is_new: false,
        is_popular: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Плита "Эко"',
        short_description: 'Экологичная гранитная плита',
        full_description: 'Экологически чистая гранитная плита из натурального камня. Создана с заботой об окружающей среде.',
        materials: 'Серый гранит',
        production_time: '3-5 дней',
        price: 800.00,
        image: '/images/graniteSlab.jpg',
        category_id: categories[3].id,
        is_new: true,
        is_popular: false
      }
    }),
    prisma.product.create({
      data: {
        name: 'Надгробие "Мир"',
        short_description: 'Надгробие с голубем мира',
        full_description: 'Трогательное надгробие с изображением голубя мира и молитвенной надписью. Символизирует мир и покой.',
        materials: 'Белый мрамор, Золотая фольга',
        production_time: '8-12 дней',
        price: 1700.00,
        discount: 15,
        discounted_price: 1445.00,
        image: '/images/gravestone.jpg',
        category_id: categories[4].id,
        is_new: false,
        is_popular: false
      }
    })
  ])

  console.log('Created products:', products.length)

  // Создаем контактную информацию
  const contactInfo = await prisma.contactInfo.create({
    data: {
      address: 'пр.Янки Купалы 22а, цокольный этаж',
      phone: '+375(29)708-21-11',
      email: 'info@granite-memory.by',
      instagram: '@granite_memory',
      working_hours: 'Пн-Пт: 9:00 - 18:00, Сб-Вс: 10:00 - 16:00'
    }
  })

  console.log('Created contact info:', contactInfo.id)

  // Создаем примеры работ
  const examplesWork = await Promise.all([
    prisma.examplesOurWork.create({
      data: {
        title: 'Мемориальный комплекс "Вечность"',
        image: '/images/memorialMonument.jpg',
        dimensions: '120 × 60 × 15 см',
        date: '15 марта 2024'
      }
    }),
    prisma.examplesOurWork.create({
      data: {
        title: 'Семейный памятник "Согласие"',
        image: '/images/doubleMonuments.jpg',
        dimensions: '100 × 80 × 12 см',
        date: '22 апреля 2024'
      }
    }),
    prisma.examplesOurWork.create({
      data: {
        title: 'Одиночный памятник "Классик"',
        image: '/images/GrneyMonument.jpg',
        dimensions: '80 × 40 × 10 см',
        date: '8 мая 2024'
      }
    }),
    prisma.examplesOurWork.create({
      data: {
        title: 'Мемориальная плита "Память"',
        image: '/images/memorialMonument.jpg',
        dimensions: '60 × 30 × 8 см',
        date: '12 июня 2024'
      }
    }),
    prisma.examplesOurWork.create({
      data: {
        title: 'Двойной памятник "Единство"',
        image: '/images/doubleMonuments.jpg',
        dimensions: '110 × 70 × 14 см',
        date: '3 июля 2024'
      }
    }),
    prisma.examplesOurWork.create({
      data: {
        title: 'Детский памятник "Ангел"',
        image: '/images/memorialMonument.jpg',
        dimensions: '50 × 25 × 6 см',
        date: '18 августа 2024'
      }
    })
  ])

  console.log('Created examples work:', examplesWork.length)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
