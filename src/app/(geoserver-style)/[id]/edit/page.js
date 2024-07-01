'use client';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDropzone } from 'react-dropzone';
import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { fetchStyleData, fetchUpdateStyleData } from '../../../utils/api';

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

function InputField({
  id,
  label,
  register,
  errors,
  placeholder,
  heightClass,
  isTextArea,
}) {
  const Component = isTextArea ? 'textarea' : 'input';
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <Component
        type="text"
        placeholder={placeholder}
        id={id}
        {...register(id)}
        className={`border ${errors ? 'border-red-500' : 'border-gray-300'} 
          rounded px-4 py-2 shadow-sm ${heightClass} focus:outline-none 
          focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-gray-400`}
      />
      {errors && <p className="text-red-500 text-sm">{errors.message}</p>}
    </>
  );
}

function ImageUploader({ onDrop, preview, onRemove }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: false,
  });

  const [isRemovingImage, setIsRemovingImage] = useState(false);

  useEffect(() => {
    setIsRemovingImage(false);
  }, [preview]);

  const handleRemoveImage = event => {
    event.stopPropagation();
    setIsRemovingImage(true);
    onRemove();
  };

  return (
    <div
      {...getRootProps({
        className: `size-96 flex justify-center items-center border-dashed border-2 hover:cursor-pointer hover:border-gray-400 ${
          isDragActive
            ? 'border-blue-500 bg-blue-500/10 focus:border-blue-500 hover:border-blue-500 text-blue-500'
            : 'border-gray-300'
        }`,
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <span className="text-blue-500 text-center font-semibold ">
          Отпустите изображение
        </span>
      ) : preview ? (
        <div className="relative">
          <Image
            className="object-contain h-[380px]"
            src={preview}
            alt="Preview"
            width={380}
            height={380}
            priority={true}
          />
          {!isRemovingImage && (
            <svg
              onClick={handleRemoveImage}
              style={{ cursor: 'pointer' }}
              className="flex absolute m-1 top-0 right-0 self-start size-6 text-gray-500 hover:text-red-500 hover:bg-red-100 bg-white border border-gray-200 hover:border-red-200 rounded-lg shadow-sm"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
      ) : (
        <span className="text-gray-500 text-center">
          Перетащите изображение <br />в область загрузки
        </span>
      )}
    </div>
  );
}

export default function EditStyle({ params }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [styleId, setStyleId] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    if (!imageFile && !styleId.image) {
      console.error('Изображение не загружено');
      setSubmitMessage('Изображение не загружено');
      return;
    }

    // Добавляем все поля формы в formData
    try {
      const data = await fetchUpdateStyleData(params.id, values, imageFile);
      console.log('Успешный ответ:', data);
      setSubmitMessage('Данные успешно обновлены');
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
      setSubmitMessage('Ошибка при обновлении данных');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchStyleData(params.id);
        setStyleId(data);
        setValue('name', data.name);
        setValue('description', data.description);
        setValue('code', data.code);
        setImagePreview(data.image);
      } catch (error) {
        setError('Не удалось загрузить данные стиля.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [params.id, setValue]);

  useEffect(() => {
    if (submitMessage) {
      const timer = setTimeout(() => setSubmitMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitMessage]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const nameString = styleId.name || 'Нет данных';

  return (
    <>
      <Header title={`Редактировать стиль - ${nameString}`} />
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
