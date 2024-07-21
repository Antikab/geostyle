import ImageUploader from './ImageUploader';
import InputField from './InputField';
import Footer from './Footer';
import { styleValidationSchema } from '../utils/validationSchema';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

export default function StyleForm({ initialData, onSubmit, isNew }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(styleValidationSchema),
  });

  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || '',
        description: initialData.description || '',
        code: initialData.code || '',
      });
      setImagePreview(initialData.image || null);
    }
  }, [initialData, reset]);

  const onDrop = async acceptedFiles => {
    const file = acceptedFiles[0];
    const fileSizeLimit = 4.5 * 1024 * 1024; // 4.5 MB
    if (file.size > fileSizeLimit) {
      setSubmitMessage('Файл слишком большой. Максимальный размер: 4.5 MB');
    } else {
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
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmitForm = async values => {
    if (isNew && !imageFile) {
      console.error('Изображение не загружено');
      setSubmitMessage('Изображение не загружено');
      return;
    }

    setIsSubmitting(true); // Установить в true перед началом асинхронной операции

    try {
      await onSubmit(values, imageFile);
      setSubmitMessage(
        isNew ? 'Стиль успешно создан' : 'Стиль успешно обновлен'
      );
      // Добавляем задержку перед перенаправлением
      setTimeout(() => {
        router.push('/');
      }, 600);
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      setSubmitMessage('Ошибка при отправке данных');
    } finally {
      setIsSubmitting(false); // Установить в false после завершения операции
    }
  };

  useEffect(() => {
    if (submitMessage) {
      const timer = setTimeout(() => setSubmitMessage(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [submitMessage]);

  return (
    <>
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
            placeholder="..."
            register={register}
            errors={errors.name}
          />
          <InputField
            id="description"
            label="Описание"
            placeholder="..."
            register={register}
            errors={errors.description}
            heightClass="h-16 xl:h-20 2xl:h-32"
            isTextArea
          />
          <InputField
            id="code"
            label="Код"
            placeholder="..."
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
      <Footer
        handleSave={handleSubmit(handleSubmitForm)}
        handleCancel={() => {
          router.back();
        }}
        isSubmitting={isSubmitting} // Передаем состояние активности
      />
    </>
  );
}
