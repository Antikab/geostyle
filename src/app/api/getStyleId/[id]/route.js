import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = params;
  console.log(params.url);
  try {
    const getStyleId = await prisma.geo_styles.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!getStyleId) {
      return NextResponse.json({ error: 'Стиль не найден.' }, { status: 404 });
    }
    console.log(getStyleId);

    return NextResponse.json(getStyleId);
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
