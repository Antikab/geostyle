import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createGeoStyle(name, description, code, filePath) {
  try {
    const newGeoStyle = await prisma.geo_styles.create({
      data: {
        name,
        description,
        code,
        image: filePath, // Храните относительный путь или URL здесь
      },
    });
    console.log('Создан новый геостиль:', newGeoStyle);
    return newGeoStyle;
  } catch (error) {
    console.error('Ошибка при создании геостиля:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const code = formData.get('code');
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

    // Получаем ArrayBuffer из файла и сохраняем его
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fsPromises.writeFile(filePath, buffer);

    console.log('Файл успешно загружен и сохранен:', filePath);
    console.log('Данные формы:', { name, description, code });

    // Создаем новую запись в базе данных
    const relativeFilePath = `/uploads/${file.name}`;
    await createGeoStyle(name, description, code, relativeFilePath);

    return NextResponse.json({
      name,
      description,
      code,
      image: filePath,
    });
  } catch (error) {
    console.error('Ошибка при обработке данных:', error);
    return NextResponse.json(
      { error: 'Ошибка при обработке данных' },
      { status: 500 }
    );
  }
}
