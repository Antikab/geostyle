export default function Pagination({
  totalCards,
  pageSize,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalCards / pageSize);

  return (
    <div className="flex w-full justify-between items-end  mt-6 gap-8">
      <p className="text-sm text-gray-500 text-nowrap">
        {totalCards} из {totalCards} стилей
      </p>
      <div className=" flex justify-between gap-6">
        <div className="flex flex-wrap justify-end">
          {' '}
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
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
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index + 1)}
              className={`flex items-center justify-center size-12 ${
                currentPage === index + 1
                  ? 'bg-gray-200 text-gray-800 font-semibold'
                  : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              } rounded-md`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
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
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
      </div>
    </div>
  );
}
