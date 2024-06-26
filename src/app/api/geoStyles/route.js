import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const geoStyles = await prisma.geo_styles.findMany();
    return NextResponse.json(geoStyles);
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
