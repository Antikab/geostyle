import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Создаем экземпляр PrismaClient для взаимодействия с базой данных
const prisma = new PrismaClient();

export async function GET(request) {
  // Извлекаем параметры поиска из запроса
  const { searchParams } = new URL(request.url);
  const currentPage = parseInt(searchParams.get('currentPage') || '1', 10); // текущая страница, по умолчанию 1
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10); // количество элементов на странице, по умолчанию 10
  const query = searchParams.get('query') || ''; // поисковый запрос, по умолчанию пустая строка

  try {
    // Формируем условие поиска, если есть поисковый запрос
    const where = query
      ? {
          OR: [
            { name: { contains: query, mode: 'insensitive' } }, // Поиск по имени, нечувствительный к регистру
            { description: { contains: query, mode: 'insensitive' } }, // Поиск по описанию, нечувствительный к регистру
          ],
        }
      : {}; // Если запроса нет, условие поиска пустое

    // Получаем общее количество стилей, соответствующих условию поиска
    const totalCards = await prisma.geo_styles.count({ where });

    // Получаем стили с учетом пагинации и условия поиска
    const styles = await prisma.geo_styles.findMany({
      where, // Условие поиска
      skip: (currentPage - 1) * pageSize, // Пропускаем элементы для предыдущих страниц
      take: pageSize, // Ограничиваем количество элементов на странице
      orderBy: {
        id: 'desc', // Сортировка по полю 'id' в порядке убывания
      },
    });

    // Возвращаем найденные стили и общее количество в формате JSON
    return NextResponse.json({ styles, totalCards, currentPage, pageSize });
  } catch (error) {
    // Логируем ошибку с дополнительной информацией
    console.error('Ошибка получения стилей:', error.message, {
      code: error.code,
      meta: error.meta,
    });

    // Возвращаем сообщение об ошибке в формате JSON с кодом статуса 500
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера.' },
      { status: 500 }
    );
  } finally {
    // Отключаемся от базы данных
    await prisma.$disconnect();
  }
}
