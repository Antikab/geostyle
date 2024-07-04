import { useCallback, useMemo } from 'react';

export default function Pagination({
  totalCards,
  pageSize,
  currentPage,
  onPageChange,
}) {
  const totalPages = useMemo(
    () => Math.ceil(totalCards / pageSize),
    [totalCards, pageSize]
  );

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (endPage - startPage + 1 < 5) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + 4);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - 4);
    }
  }

  const goToPrevious = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const goToNext = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, onPageChange, totalPages]);

  const pageSizeOptions = [10, 20, 30, 50].filter(
    option => option <= totalCards
  );

  return (
    <div className="flex w-full justify-between items-end  mt-6 gap-6">
      <p className="text-sm text-gray-500 text-nowrap">
        <span className="text-gray-600 font-medium">
          {(currentPage - 1) * pageSize + 1}-
          {Math.min(currentPage * pageSize, totalCards)}
        </span>{' '}
        из {totalCards} стилей
      </p>
      <div className=" flex justify-between gap-4">
        <div className="flex flex-wrap justify-center">
          {/* Кнопка "Назад" */}
          <button
            disabled={currentPage === 1}
            onClick={goToPrevious}
            className="flex items-center justify-center size-12 bg-white rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-800 disabled:text-gray-200 disabled:hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          {/* Кнопка "Первая" */}
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(1)}
            className="flex items-center justify-center size-12 bg-white rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-800 disabled:text-gray-200 disabled:hover:bg-white"
          >
            Первая
          </button>
          {/* Кнопки для отображения страниц */}
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <button
              key={startPage + index}
              onClick={() => onPageChange(startPage + index)}
              className={`flex items-center justify-center size-12 ${
                startPage + index === currentPage
                  ? 'bg-gray-200 text-gray-800 font-semibold'
                  : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              } rounded-md`}
            >
              {startPage + index}
            </button>
          ))}
          {/* Кнопка "Последняя" */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
            className="flex items-center justify-center size-12 bg-white rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-800 disabled:text-gray-200 disabled:hover:bg-white"
          >
            х
          </button>
          {/* Кнопка "Вперед" */}
          <button
            disabled={currentPage === totalPages}
            onClick={goToNext}
            className="flex items-center justify-center size-12 bg-white rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-800 disabled:text-gray-200 disabled:hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6 rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>
        {/* Выбор количества элементов на странице */}
        <div>
          <label htmlFor="style-filter" className="sr-only">
            Количество элементов на странице:
          </label>
          <select
            value={pageSize}
            onChange={e => onPageChange(1, parseInt(e.target.value))}
            className="flex py-2 px-5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-gray-400"
            id="style-filter"
          >
            {pageSizeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
