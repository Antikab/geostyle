import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import supabase from '@/lib/supabaseClient';

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    // Найдите стиль, чтобы получить информацию о файле изображения
    const styleId = await prisma.geo_styles.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!styleId) {
      return NextResponse.json({ error: 'Стиль не найден' }, { status: 404 });
    }

    const fileUrl = styleId.image; // URL файла в Supabase Storage
    const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1); // Получаем имя файла из URL

    // Удалить файл из Supabase Storage по имени файла
    const { data, error } = await supabase.storage
      .from('uploads')
      .remove([fileName]);

    if (error) {
      throw new Error(
        `Ошибка при удалении файла из Supabase Storage: ${error.message}`
      );
    }

    // Удалить стиль из базы данных
    const deleteStyleId = await prisma.geo_styles.delete({
      where: { id: parseInt(id, 10) },
    });
    console.log('Стиль успешно удалён:', deleteStyleId);

    // Возвращаем ответ об успешном удалении
    return NextResponse.json({
      message: 'Стиль успешно удалён',
      deleteStyleId,
    });
  } catch (error) {
    console.error('Ошибка при удалении стиля:', error.message);

    // Возвращаем ошибку при удалении
    return NextResponse.json(
      { error: 'Ошибка при удалении стиля' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
