'use client';
import { useState, useEffect } from 'react';
import Header from './Header';
import SearchForm from './SearchForm';
import Pagination from './Pagination';
import StyleCard from './StyleCard';
import Button from './Button';
import { fetchStyles } from '../utils/api';

export default function Home() {
  const editLink = 'new-style';
  const [styles, setStyle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // текущая страница
  const [pageSize, setPageSize] = useState(10); // количество стилей на странице
  const [totalCards, setTotalCards] = useState(0); // общее количество стилей
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false); //отслеживания отсутствия результатов

  useEffect(() => {
    async function loadStyles() {
      setLoading(true);
      try {
        const data = await fetchStyles(currentPage, pageSize); // Используем утилитарную функцию
        setStyle(data.styles);
        setTotalCards(data.totalCards);
        setNotFound(data.styles.length === 0); // Проверяем, есть ли результаты поиска
      } catch (error) {
        console.error('Ошибка получения стилей:', error);
        setError('Не удалось загрузить стили.');
      } finally {
        setLoading(false);
      }
    }
    loadStyles();
  }, [currentPage, pageSize]);

  // Функция для выполнения поиска
  const handleSearch = async query => {
    setLoading(true);
    try {
      const data = await fetchStyles(1, pageSize, query); // Здесь должны быть параметры для поиска
      setStyle(data.styles);
      setTotalCards(data.totalCards);
      setCurrentPage(1); // Сброс текущей страницы при поиске
      setNotFound(data.styles.length === 0); // Проверяем, есть ли результаты поиска
    } catch (error) {
      console.error('Ошибка при выполнении поиска:', error);
      setError('Ошибка при выполнении поиска.');
    } finally {
      setLoading(false);
    }
  };

  // Функция для изменения текущей страницы
  const handlePageChange = (page, size = pageSize) => {
    setCurrentPage(page); // обновляет текущую страницу
    setPageSize(size); // обновляет количество стилей на странице
  };

  return (
    <>
      <Header title="Стили для Geoserver" />
      <div className="bg-white border border-gray-200 shadow-sm p-4 rounded-lg">
        <SearchForm onSearch={handleSearch} />
        <Pagination
          totalCards={totalCards}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="flex justify-center sm:justify-end  p-4">
        <Button
          className="bg-white border border-gray-300 text-gray-800 font-semibold hover:bg-gray-100 hover:border-400 focus:outline-none focus:ring focus:ring-gray-300"
          href={editLink}
        >
          Создать новый стиль
        </Button>
      </div>
      <div
        className={`${
          styles.length > 0 &&
          'grid grid-cols-1 portrait:md:lg:grid-cols-1  landscape:md:lg:grid-cols-2 lg:grid-cols-2'
        } gap-8 mt-8`}
      >
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
              className="mt-0.5 size-8 text-red-800"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" x2="12" y1="8" y2="12"></line>
              <line x1="12" x2="12.01" y1="16" y2="16"></line>
            </svg>
            {error}
          </div>
        ) : notFound ? ( // Показываем сообщение, если стили не найдены
          <div className="rounded-md flex w-full grid-rows-none grid-cols-none items-center justify-center flex-nowrap gap-4 border p-4 font-medium text-lg border-sky-200 bg-sky-100 text-sky-900">
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
            <span>Стилей по вашему запросу не найдено.</span>
          </div>
        ) : styles.length > 0 ? (
          styles.map(item => (
            <StyleCard
              key={item.id}
              name={item.name}
              description={item.description}
              link={`/${item.id}`}
              image={item.image}
            />
          ))
        ) : (
          <div className="rounded-md flex w-full grid-rows-none grid-cols-none items-center justify-center flex-nowrap gap-4 border p-4 font-medium text-lg border-red-200 bg-red-100 text-red-900">
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
            <span>Нет доступных стилей.</span>
          </div>
        )}
      </div>
    </>
  );
}
