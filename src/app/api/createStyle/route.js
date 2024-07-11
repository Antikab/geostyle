import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const code = formData.get('code');
    const file = formData.get('file');

    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(fileName, file);

    if (error) {
      throw new Error(
        `Ошибка при загрузке файла в Supabase Storage: ${error.message}`
      );
    }

    const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${fileName}`;
    console.log(fileUrl);
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
