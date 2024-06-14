'use client';
import { useState, useEffect } from 'react';
import Header from './Header';
import SearchForm from './SearchForm';
import Pagination from './Pagination';
import StyleCard from './StyleCard';

export default function Home() {
  const [geoStyles, setGeoStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/geoStyles');
        if (!res.ok) {
          throw new Error(`Ошибка сервера: ${res.status}`);
        }
        const data = await res.json();
        setGeoStyles(data);
      } catch (error) {
        console.error('Ошибка получения геостилей:', error);
        setError(
          'Не удалось загрузить геостили. Пожалуйста, попробуйте позже.'
        );
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Header title="Стили для Geoserver" />
      <div className="bg-white border border-gray-200 shadow-sm p-4 rounded-lg">
        <SearchForm />
        <Pagination />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 mt-8">
        {loading ? (
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
        ) : error ? (
          <div className="relative flex items-center justify-center flex-nowrap gap-4 rounded-md border p-4 border-red-200 bg-red-100 w-full col-span-2 text-lg font-medium text-red-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 28 28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 size-8 text-error-800"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" x2="12" y1="8" y2="12"></line>
              <line x1="12" x2="12.01" y1="16" y2="16"></line>
            </svg>
            {error}
          </div>
        ) : geoStyles.length > 0 ? (
          geoStyles.map(item => (
            <StyleCard
              key={item.id}
              name={item.name}
              description={item.description}
              link={`/${item.id}`}
              image={item.image}
            />
          ))
        ) : (
          <p>Нет доступных геостилей.</p>
        )}
      </div>
    </>
  );
}
