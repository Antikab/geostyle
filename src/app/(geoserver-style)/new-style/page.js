'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ImageUploader from '../../components/ImageUploader';
import InputField from '../../components/InputField';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Схема валидации Yup
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .typeError('Должна быть строка')
    .min(3, 'Минимальная длина поля - 3 символа')
    .required('Поле 1 обязательно'),
  description: yup.string().typeError('Должна быть строка'),
  code: yup
    .string()
    .typeError('Должна быть строка')
    .min(3, 'Минимальная длина поля - 3 символа')
    .required('Поле 3 обязательно'),
});

export default function NewStyle({}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitMessage, setSubmitMessage] = useState(null); // Для отображения сообщений

  const onDrop = useCallback(async acceptedFiles => {
    const file = acceptedFiles[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.onerror = () => {
      console.error('Ошибка чтения файла');
      setSubmitMessage('Ошибка чтения файла');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit = async () => {
    const values = watch(); // Получаем значения из формы
    const formData = new FormData();

    if (!imageFile) {
      console.error('Изображение не загружено');
      setSubmitMessage('Изображение не загружено');
      return;
    }

    // Добавляем все поля формы в formData
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }

    const uniqueId = self.crypto.randomUUID(); // Создаем уникальный идентификатор
    const originalFileName = imageFile.name; // Извлекаем расширение исходного файла
    const extension = originalFileName.substring(
      originalFileName.lastIndexOf('.')
    );
    const uniqueFileName = `${uniqueId}${extension}`; // Создаем уникальное имя файла
    formData.append('file', imageFile, uniqueFileName);

    try {
      const response = await fetch('/api/createStyle', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      // Добавляем задержку в 1 секунду перед перенаправлением
      setTimeout(() => {
        router.push('/');
      }, 600);

      if (!response.ok) {
        throw new Error('Сетевой ответ не был успешным');
      }

      console.log('Стиль успешно создан:', data);
      setSubmitMessage('Стиль успешно создан');
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      setSubmitMessage('Ошибка при отправке данных');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  useEffect(() => {
    if (submitMessage) {
      const timer = setTimeout(() => setSubmitMessage(null), 500);
      return () => clearTimeout(timer);
    }
  }, [submitMessage]);

  return (
    <>
      <Header title="Создать новый стиль" />
      <div className="flex flex-grow items-start gap-12 bg-white border border-gray-200 rounded-t-lg shadow-sm p-8">
        <div className="size-max p-6 flex items-start justify-center border border-gray-200 shadow-sm">
          <ImageUploader
            onDrop={onDrop}
            preview={imagePreview}
            onRemove={handleRemoveImage}
          />
        </div>
        <form className="flex flex-col gap-4 w-full px-1 pb-1 max-w-screen-lg overflow-x-auto flex-grow">
          <InputField
            id="name"
            label="Название"
            placeholder="зоны подтопления"
            register={register}
            errors={errors.name}
          />
          <InputField
            id="description"
            label="Описание"
            placeholder="территории сильного подтопления"
            register={register}
            errors={errors.description}
            heightClass="h-16 xl:h-20 2xl:h-32"
            isTextArea
          />
          <InputField
            id="code"
            label="Код"
            placeholder="stroke: #007aff;"
            register={register}
            errors={errors.code}
            heightClass="h-36 xl:h-52 2xl:h-80"
            isTextArea
          />
        </form>
      </div>
      {submitMessage && (
        <div
          className={`relative flex items-center justify-center flex-nowrap gap-4 border p-4 font-medium text-lg 
            ${
              submitMessage.includes('успешно')
                ? 'border-green-200 bg-green-100 text-green-900'
                : 'border-red-200 bg-red-100 text-red-900'
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 size-8"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="8" y2="12"></line>
            <line x1="12" x2="12.01" y1="16" y2="16"></line>
          </svg>
          <span>{submitMessage}</span>
        </div>
      )}
      <Footer handleSave={handleSubmit(onSubmit)} handleCancel={handleCancel} />
    </>
  );
}
