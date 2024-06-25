'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDropzone } from 'react-dropzone';
import { useState, useCallback } from 'react';
import Image from 'next/image';

// Схема валидации Yup
const validationSchema = yup.object().shape({
  field1: yup
    .string()
    .typeError('Должна быть строка')
    .min(3, 'Минимальная длина поля - 3 символа')
    .required('Поле 1 обязательно'),
  field2: yup.string().typeError('Должна быть строка'),
  field3: yup
    .string()
    .typeError('Должна быть строка')
    .min(3, 'Минимальная длина поля - 3 символа')
    .required('Поле 3 обязательно'),
});

function InputField({ id, label, register, errors, placeholder, heightClass }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      {id === 'field1' ? (
        <input
          type="text"
          placeholder={placeholder}
          id={id}
          {...register(id)}
          className={`border ${
            errors ? 'border-red-500' : 'border-gray-300'
          } rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-gray-400`}
        />
      ) : (
        <textarea
          type="text"
          placeholder={placeholder}
          id={id}
          {...register(id)}
          className={`border ${
            errors ? 'border-red-500' : 'border-gray-300'
          } rounded px-4 py-2 shadow-sm ${heightClass} focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-gray-400`}
        />
      )}
      {errors && <p className="text-red-500 text-sm">{errors.message}</p>}
    </>
  );
}

function ImageUploader({ onDrop, preview }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: false, // Разрешаем загружать только один файл
  });

  return (
    <div
      {...getRootProps({
        className: `size-96 flex justify-center items-center border-dashed border-2 hover:cursor-pointer ${
          isDragActive
            ? 'border-blue-500 bg-blue-500/10 focus:border-blue-500 hover:border-blue-500 '
            : 'border-gray-300'
        } hover:border-gray-400`,
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <span className="text-blue-500 text-center font-semibold">
          Отпустите файл
        </span>
      ) : preview ? (
        <Image
          className="object-contain h-[380px]"
          src={preview}
          alt="Preview"
          width={380}
          height={380}
        />
      ) : (
        <span className="text-gray-500 text-center">
          Перетащите изображение <br />
          для загрузки
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
      setError('Ошибка чтения файла');
    };
    reader.readAsDataURL(file);
  }, []);

  const onSubmit = () => {
    const values = watch();

    if (!imageFile) {
      console.error('Файл не загружен');
      setSubmitMessage('Файл не загружен');
      return;
    }

    const formData = new FormData();

    for (const key in values) {
      formData.append(key, values[key]);
    }

    formData.append('file', imageFile);

    fetch('/api/createGeoStyles', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Сетевой ответ не был успешным');
        }
        return response.json();
      })
      .then(data => {
        console.log('Успешный ответ:', data);
        setSubmitMessage('Данные успешно отправлены');
      })
      .catch(error => {
        console.error('Ошибка при отправке данных:', error);
        setSubmitMessage('Ошибка при отправке данных');
      });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <Header title={`Редактировать стиль ${params.viewStyleId}`} />
      <div className="flex flex-grow items-start gap-12 bg-white border border-gray-200 rounded-t-lg shadow-sm p-8">
        <div className="size-max p-6 flex items-start justify-center border border-gray-200 shadow-sm">
          <ImageUploader onDrop={onDrop} preview={imagePreview} />
        </div>
        <form className="flex flex-col gap-4 w-full px-1 pb-1 max-w-screen-lg overflow-x-auto flex-grow">
          <InputField
            id="field1"
            label="Название"
            placeholder="зоны подтопления"
            register={register}
            errors={errors.field1}
          />
          <InputField
            id="field2"
            label="Описание"
            placeholder="территории сильного подтопления"
            register={register}
            errors={errors.field2}
            heightClass="h-16 xl:h-20 2xl:h-32"
          />
          <InputField
            id="field3"
            label="Код"
            placeholder="stroke: #007aff;"
            register={register}
            errors={errors.field3}
            heightClass="h-36 xl:h-52 2xl:h-80"
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
