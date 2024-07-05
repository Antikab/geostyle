import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const currentPage = parseInt(searchParams.get('currentPage')) || 1; // текущая страница
  const pageSize = parseInt(searchParams.get('pageSize')) || 10; // количество отображаемых стилей на странице

  try {
    const totalCards = await prisma.geo_styles.count(); // получаем общее количество стилей
    const geoStyles = await prisma.geo_styles.findMany({
      orderBy: {
        id: 'desc', // Сортировка по полю 'id' в порядке убывания
      },
      skip: (currentPage - 1) * pageSize, // пропускаем стили для предыдущих страниц
      take: pageSize, // берем указанное количество стилей для текущей страницы
    });

    const responseData = {
      geoStyles,
      totalCards,
      currentPage,
      pageSize,
    };

    console.log(`
      totalCards: ${totalCards}, 
      currentPage: ${currentPage}, 
      pageSize: ${pageSize}
      `);

    return NextResponse.json(responseData); // возвращаем данные в формате JSON
  } catch (error) {
    // Логирование ошибки с дополнительной информацией
    console.error('Ошибка получения стилей:', error.message, {
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
