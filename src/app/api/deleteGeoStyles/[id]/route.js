import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const deletedGeoStyle = await prisma.geo_styles.delete({
      where: { id: parseInt(id, 10) },
    });
    console.log('Стиль успешно удалён:', deletedGeoStyle);

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
