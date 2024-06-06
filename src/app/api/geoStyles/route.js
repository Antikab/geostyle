import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const geoStyles = await prisma.geo_styles.findMany();
    return NextResponse.json(geoStyles);
  } catch (error) {
    console.error('Ошибка получения геостилей:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
