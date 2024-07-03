import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const pageSize = parseInt(searchParams.get('pageSize')) || 10;

  try {
    const totalCount = await prisma.geo_styles.count();
    const geoStyles = await prisma.geo_styles.findMany({
      orderBy: {
        id: 'desc', // Сортировка по полю 'id' в порядке убывания
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return NextResponse.json({
      geoStyles,
      totalCount,
      page,
      pageSize,
    });
  } catch (error) {
    // Логирование ошибки с дополнительной информацией
    console.error('Ошибка получения геостилей:', error.message, {
      code: error.code,
      meta: error.meta,
    });

    // Возвращаем пользователю расширенное сообщение об ошибке
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
