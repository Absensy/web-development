import { NextRequest, NextResponse } from 'next/server';
import { createStorageProvider } from '@/lib/cloudStorage';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'product', 'category', 'example'

    if (!file) {
      return NextResponse.json({ error: 'Файл не найден' }, { status: 400 });
    }

    if (!type) {
      return NextResponse.json({ error: 'Тип файла не указан' }, { status: 400 });
    }

    // Проверяем тип файла
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Неподдерживаемый тип файла. Разрешены: JPEG, PNG, WebP, PDF' 
      }, { status: 400 });
    }

    // Проверяем размер файла (10MB для PDF, 5MB для изображений)
    const maxSize = file.type === 'application/pdf' ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: `Размер файла не должен превышать ${file.type === 'application/pdf' ? '10MB' : '5MB'}` 
      }, { status: 400 });
    }

    // Создаем уникальное имя файла
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${type}_${timestamp}.${fileExtension}`;

    // Получаем провайдер хранилища
    const storage = createStorageProvider();
    
    // Конвертируем файл в Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Загружаем файл в облачное хранилище
    const result = await storage.uploadFile(
      buffer,
      fileName,
      type
    );

    return NextResponse.json({ 
      success: true, 
      fileUrl: result.url,
      fileName: result.fileName,
      publicId: result.publicId
    });

  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
    return NextResponse.json({ 
      error: 'Ошибка сервера при загрузке файла' 
    }, { status: 500 });
  }
}
