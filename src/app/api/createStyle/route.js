import supabase from '@/lib/supabaseClient'; // Обновленный путь для импорта
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function createStyle(name, description, code, imageUrl) {
  try {
    const newStyle = await prisma.geo_styles.create({
      data: {
        name,
        description,
        code,
        image: imageUrl,
      },
    });
    console.log('Создан новый стиль:', newStyle);

    return newStyle;
  } catch (error) {
    console.error('Ошибка при создании стиля:', error);
    throw new Error('Ошибка при создании стиля');
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const code = formData.get('code');
    const file = formData.get('file');

    console.log('Полученные данные формы:', { name, description, code, file });

    if (!file) {
      console.log('Файл не загружен или отсутствует имя файла');
      return NextResponse.json(
        { error: 'Файл не загружен или отсутствует имя файла' },
        { status: 400 }
      );
    }

    // Создаем новое имя файла, заменяя пробелы на подчеркивания и удаляя недопустимые символы
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');

    const uniqueFileName = `${Date.now()}_${sanitizedFileName}`;
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(uniqueFileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Ошибка при загрузке файла в Supabase Storage:', error);
      return NextResponse.json(
        { error: 'Ошибка при загрузке файла в Supabase Storage' },
        { status: 500 }
      );
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${uniqueFileName}`;
    console.log('URL загруженного изображения:', imageUrl);

    await createStyle(name, description, code, imageUrl);

    return NextResponse.json({
      name,
      description,
      code,
      image: imageUrl,
    });
  } catch (error) {
    console.error('Ошибка при обработке данных:', error);
    return NextResponse.json(
      { error: 'Ошибка при обработке данных' },
      { status: 500 }
    );
  }
}
