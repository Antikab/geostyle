'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDropzone } from 'react-dropzone';
import { useState, useCallback } from 'react';

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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps({
        className: `size-96 flex justify-center items-center border-dashed border-2 hover:cursor-pointer ${
          isDragActive
            ? 'border-blue-500 bg-blue-500/10 focus:border-blue-500 hover:border-blue-500 '
            : 'border-gray-300'
        } hover:border-gray-400 p-4`,
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <span className="text-blue-500 text-center font-semibold">
          Отпустите файл
        </span>
      ) : preview ? (
        <img src={preview} alt="Preview" className="max-h-full max-w-full" />
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [imagePreview, setImagePreview] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const onSubmit = data => {
    console.log('Сохранение:', data);
    // Дополнительная логика сохранения данных
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
            heightClass="h-28"
          />
          <InputField
            id="field3"
            label="Код"
            placeholder="stroke: #007aff;"
            register={register}
            errors={errors.field3}
            heightClass="h-96"
          />
        </form>
      </div>
      <Footer handleSave={handleSubmit(onSubmit)} handleCancel={handleCancel} />
    </>
  );
}
