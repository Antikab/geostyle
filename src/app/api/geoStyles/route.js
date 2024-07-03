import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1; // текущая страница
  const pageSize = parseInt(searchParams.get('pageSize')) || 10; // количество стилей на странице

  try {
    const totalCount = await prisma.geo_styles.count(); // получаем общее количество стилей
    const geoStyles = await prisma.geo_styles.findMany({
      orderBy: {
        id: 'desc', // Сортировка по полю 'id' в порядке убывания
      },
      skip: (page - 1) * pageSize, // пропускаем записи для предыдущих страниц
      take: pageSize, // берем указанное количество записей для текущей страницы
    });

    const responseData = {
      geoStyles,
      totalCount,
      page,
      pageSize,
    };

    console.log('Response Data:', responseData);

    return NextResponse.json(responseData); // возвращаем данные в формате JSON
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
    await prisma.$disconnect(); // отключаемся от базы данных
  }
}
