'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; // Импорт yupResolver
import * as Yup from 'yup'; // Импорт Yup для создания схемы валидации

// Схема валидации Yup
const validationSchema = Yup.object().shape({
  field1: Yup.string().required('Поле 1 обязательно'),
  field2: Yup.string().required('Поле 2 обязательно'),
  field3: Yup.string().required('Поле 3 обязательно'),
});

export default function ViewStyle({ params }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema), // Использование yupResolver с схемой валидации
  });

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
        <div className="flex items-start justify-center border border-gray-200">
          {/* Форма с тремя полями */}
          <form className="flex flex-col gap-4 w-full max-w-md">
            <label htmlFor="field1">Поле 1</label>
            <input
              type="text"
              id="field1"
              {...register('field1')}
              className={`border ${
                errors.field1 ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2`}
            />
            {errors.field1 && (
              <p className="text-red-500">{errors.field1.message}</p>
            )}{' '}
            {/* Сообщение об ошибке */}
            <label htmlFor="field2">Поле 2</label>
            <input
              type="text"
              id="field2"
              {...register('field2')}
              className={`border ${
                errors.field2 ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2`}
            />
            {errors.field2 && (
              <p className="text-red-500">{errors.field2.message}</p>
            )}{' '}
            {/* Сообщение об ошибке */}
            <label htmlFor="field3">Поле 3</label>
            <input
              type="text"
              id="field3"
              {...register('field3')}
              className={`border ${
                errors.field3 ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2`}
            />
            {errors.field3 && (
              <p className="text-red-500">{errors.field3.message}</p>
            )}{' '}
            {/* Сообщение об ошибке */}
          </form>
        </div>
      </div>
      {/* Передача обработчика handleCancel в компонент Footer */}
      <Footer handleSave={handleSubmit(onSubmit)} handleCancel={handleCancel} />
    </>
  );
}
