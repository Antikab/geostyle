import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('field1');
    const description = formData.get('field2');
    const code = formData.get('field3');
    const file = formData.get('file');

    // Вывод информации о файле в консоль для отладки
    console.log('File:', file);

    if (!file) {
      console.log('Файл не загружен или отсутствует имя файла');
      return NextResponse.json(
        { error: 'Файл не загружен или отсутствует имя файла' },
        { status: 400 }
      );
    }

    const uploadsDir = join(process.cwd(), 'public/uploads');
    // Создайте директорию, если она не существует
    await fsPromises.mkdir(uploadsDir, { recursive: true });

    // Создайте путь для сохранения файла
    const filePath = join(uploadsDir, file.name);

    // Получите ArrayBuffer из файла
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Сохраните файл
    await fsPromises.writeFile(filePath, buffer);

    console.log('Файл успешно загружен и сохранен:', filePath);
    console.log('Данные формы:', { name, description, code });

    return NextResponse.json({ name, description, code, filePath });
  } catch (error) {
    console.error('Ошибка при обработке данных:', error);
    return NextResponse.json(
      { error: 'Ошибка при обработке данных' },
      { status: 500 }
    );
  }
}
