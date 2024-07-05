import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function updateGeoStyle(id, name, description, code, filePath) {
  try {
    const updatedGeoStyle = await prisma.geo_styles.update({
      where: { id: parseInt(id, 10) }, // Предполагается, что id является целым числом
      data: {
        name,
        description,
        code,
        image: filePath || undefined, // Обновляем только если filePath не пустой
      },
    });
    return NextResponse.json({
      message: 'Геостиль успешно обновлен',
      updatedGeoStyle,
    });
  } catch (error) {
    console.error('Ошибка при обновлении геостиля:', error);

    return NextResponse.json(
      { error: 'Ошибка при обновлении геостиля' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const code = formData.get('code');
    const file = formData.get('file');

    // Вывод информации о файле в консоль для отладки
    console.log('File:', file);

    let filePath = null;
    if (file) {
      const uploadsDir = join(process.cwd(), 'public/uploads');
      // Создайте директорию, если она не существует
      await fsPromises.mkdir(uploadsDir, { recursive: true });

      // Создайте путь для сохранения файла
      const uniqueId = crypto.randomUUID(); // Создаем уникальный идентификатор
      const originalFileName = file.name; // Извлекаем расширение исходного файла
      const extension = originalFileName.substring(
        originalFileName.lastIndexOf('.')
      );
      const uniqueFileName = `${uniqueId}${extension}`; // Создаем уникальное имя файла
      filePath = join(uploadsDir, uniqueFileName);

      // Получаем ArrayBuffer из файла и сохраняем его
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await fsPromises.writeFile(filePath, buffer);

      filePath = `/uploads/${uniqueFileName}`;
      console.log('Файл успешно загружен и сохранен:', filePath);
    }

    console.log('Данные формы:', { id, name, description, code });

    // Обновляем запись в базе данных
    const updatedGeoStyle = await updateGeoStyle(
      id,
      name,
      description,
      code,
      filePath
    );

    return NextResponse.json(updatedGeoStyle);
  } catch (error) {
    console.error('Ошибка при обработке данных:', error);
    return NextResponse.json(
      { error: 'Ошибка при обработке данных' },
      { status: 500 }
    );
  }
}
