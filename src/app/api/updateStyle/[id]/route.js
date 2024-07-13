import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import supabase from '@/lib/supabaseClient';

async function getExistingStyle(id) {
  return await prisma.geo_styles.findUnique({
    where: { id: parseInt(id, 10) },
  });
}

async function deleteOldFile(oldFileName) {
  const { error } = await supabase.storage
    .from('uploads')
    .remove([oldFileName]);

  if (error) {
    console.error(
      'Ошибка при удалении старого файла из Supabase Storage:',
      error
    );
    throw new Error('Ошибка при удалении старого файла');
  }
}

async function uploadNewFile(file) {
  const fileName = file.name;
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(fileName, file);

  if (error) {
    console.error(
      'Ошибка при загрузке нового файла в Supabase Storage:',
      error
    );
    throw new Error('Ошибка при загрузке нового файла');
  }

  return `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${fileName}`;
}

async function updateStyle(id, name, description, code, fileUrl) {
  try {
    const updateStyleId = await prisma.geo_styles.update({
      where: { id: parseInt(id, 10) }, // Предполагается, что id является целым числом
      data: {
        name,
        description,
        code,
        image: fileUrl || undefined, // Обновляем только если filePath не пустой
      },
    });

    return updateStyleId;
  } catch (error) {
    console.error('Ошибка при обновлении стиля:', error);
    throw new Error('Ошибка при обновлении стиля');
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const code = formData.get('code');
    const file = formData.get('image');

    let fileUrl;

    if (file) {
      // Найти существующий стиль, чтобы получить информацию о старом изображении
      const existingStyle = await getExistingStyle(id);

      // Если стиль и его изображение существуют, удалить старое изображение из Supabase Storage
      if (existingStyle && existingStyle.image) {
        const oldFileName = existingStyle.image.substring(
          existingStyle.image.lastIndexOf('/') + 1
        );
        await deleteOldFile(oldFileName);
      }

      // Загрузить новое изображение в Supabase Storage
      fileUrl = await uploadNewFile(file);
    }

    // Обновить стиль с новыми данными и (если имеется) новым URL изображения
    const updateStyleId = await updateStyle(
      id,
      name,
      description,
      code,
      fileUrl
    );

    return NextResponse.json(updateStyleId);
  } catch (error) {
    console.error('Ошибка при обработке данных:', error);
    return NextResponse.json(
      { error: 'Ошибка при обработке данных' },
      { status: 500 }
    );
  }
}
