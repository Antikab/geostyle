import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const styleId = await prisma.geo_styles.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!styleId) {
      return NextResponse.json({ error: 'Стиль не найден.' }, { status: 404 });
    }
    console.log(styleId);

    return NextResponse.json(styleId);
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
    await prisma.$disconnect();
  }
}
