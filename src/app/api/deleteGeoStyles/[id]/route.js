import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    // Найдите стиль, чтобы получить информацию о файле изображения
    const geoStyle = await prisma.geo_styles.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!geoStyle) {
      return NextResponse.json({ error: 'Стиль не найден' }, { status: 404 });
    }

    // Удалить стиль из базы данных
    const deletedGeoStyle = await prisma.geo_styles.delete({
      where: { id: parseInt(id, 10) },
    });
    console.log('Стиль успешно удалён:', deletedGeoStyle);

    // Путь к файлу изображения
    const imagePath = path.join(
      process.cwd(),
      'public/uploads',

      geoStyle.image.replace('/uploads/', '') // Убираем начальный слэш
    );

    // Удалить файл изображения
    fs.unlink(imagePath, err => {
      if (err) {
        console.error('Ошибка при удалении изображения:', err);
      } else {
        console.log('Изображение успешно удалено:', geoStyle.image);
      }
    });

    return NextResponse.json({
      message: 'Стиль успешно удалён',
      deletedGeoStyle,
    });
  } catch (error) {
    console.error('Ошибка при удалении стиля:', error.message);

    return NextResponse.json(
      { error: 'Ошибка при удалении стиля' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
