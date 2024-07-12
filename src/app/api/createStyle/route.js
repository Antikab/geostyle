import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import supabase from '@/lib/supabaseClient';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const code = formData.get('code');
    const file = formData.get('file');

    // Проверяем размер файла
    const fileSizeLimit = 4.5 * 1024 * 1024; // 4.5 MB
    if (file.size > fileSizeLimit) {
      throw new Error('Файл слишком большой. Максимальный размер: 4.5 MB');
    }

    // Вывод информации о файле в консоль для отладки
    console.log('File:', file);

    const fileName = file.name;
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(fileName, file);

    if (error) {
      throw new Error(
        `Ошибка при загрузке файла в Supabase Storage: ${error.message}`
      );
    }

    const fileUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${fileName}`;
    const newStyle = await prisma.geo_styles.create({
      data: {
        name,
        description,
        code,
        image: fileUrl,
      },
    });

    return NextResponse.json(newStyle);
  } catch (error) {
    console.error('Ошибка при создании стиля:', error);
    return NextResponse.json(
      { error: 'Ошибка при создании стиля' },
      { status: 500 }
    );
  }
}
