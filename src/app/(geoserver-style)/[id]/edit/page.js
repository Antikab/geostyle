'use client';

import Header from '../../../components/Header';
import StyleForm from '../../../components/StyleForm';
import { useState, useEffect } from 'react';
import { fetchStyleId, fetchUpdateStyleId } from '../../../utils/api';

export default function EditStyle({ params }) {
  const [styleId, setStyleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleUpdateStyle = async (values, imageFile) => {
    try {
      await fetchUpdateStyleId(params.id, values, imageFile);
    } catch (error) {
      console.error('Ошибка при обновлении стиля:', error);
      setError('Ошибка при обновлении стиля');
    }
  };

  // Загрузка данных стиля
  useEffect(() => {
    async function loadStyleId() {
      try {
        const data = await fetchStyleId(params.id);
        setStyleId(data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    }
    loadStyleId();
  }, [params.id]);

  if (loading) {
    return (
      <svg
        className="animate-spin size-14 my-0 mx-auto col-span-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g transform="rotate(360 12 12)">
          <circle
            cx={12}
            cy={2.5}
            r={1.5}
            fill="currentColor"
            opacity={0.14}
          ></circle>
          <circle
            cx={16.75}
            cy={3.77}
            r={1.5}
            fill="currentColor"
            opacity={0.29}
          ></circle>
          <circle
            cx={20.23}
            cy={7.25}
            r={1.5}
            fill="currentColor"
            opacity={0.43}
          ></circle>
          <circle
            cx={21.5}
            cy={12}
            r={1.5}
            fill="currentColor"
            opacity={0.57}
          ></circle>
          <circle
            cx={20.23}
            cy={16.75}
            r={1.5}
            fill="currentColor"
            opacity={0.71}
          ></circle>
          <circle
            cx={16.75}
            cy={20.23}
            r={1.5}
            fill="currentColor"
            opacity={0.86}
          ></circle>
          <circle cx={12} cy={21.5} r={1.5} fill="currentColor"></circle>
        </g>
      </svg>
    );
  }

  if (error) {
    return (
      <div className="relative flex items-center justify-center rounded-md flex-nowrap gap-4 border p-4 font-medium text-lg border-red-200 bg-red-100 text-red-900">
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
        {error}
      </div>
    );
  }

  return (
    <>
      <Header title={`Редактировать стиль - ${styleId?.name}`} />
      <StyleForm
        initialData={styleId}
        onSubmit={handleUpdateStyle}
        isNew={false}
      />
    </>
  );
}
