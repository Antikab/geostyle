import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const size = parseInt(searchParams.get('size') || '10', 10);
  const query = searchParams.get('query') || '';

  try {
    const where = query
      ? {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        }
      : {};

    const totalCards = await prisma.geo_styles.count({ where });
    const styles = await prisma.geo_styles.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
    });

    return NextResponse.json({ styles, totalCards });
  } catch (error) {
    console.error('Ошибка получения стилей:', error.message, {
      code: error.code,
      meta: error.meta,
    });
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
