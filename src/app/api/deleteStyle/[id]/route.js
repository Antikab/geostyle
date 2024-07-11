import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import prisma from '@/lib/prisma';

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    // Найдите стиль, чтобы получить информацию о файле изображения
    const styleId = await prisma.geo_styles.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!styleId) {
      return NextResponse.json({ error: 'Стиль не найден' }, { status: 404 });
    }

    // Удалить стиль из базы данных
    const deleteStyleId = await prisma.geo_styles.delete({
      where: { id: parseInt(id, 10) },
    });
    console.log('Стиль успешно удалён:', deleteStyleId);

    // Путь к файлу изображения
    const imagePath = path.join(process.cwd(), 'public', styleId.image);

    // Удалить файл изображения
    fs.unlink(imagePath, err => {
      if (err) {
        console.error('Ошибка при удалении изображения:', err);
      } else {
        console.log('Изображение успешно удалено:', styleId.image);
      }
    });

    return NextResponse.json({
      message: 'Стиль успешно удалён',
      deleteStyleId,
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
