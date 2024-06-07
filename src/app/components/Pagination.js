'use client';

export default function Pagination() {
  return (
    <div className="flex w-full justify-between items-end">
      <p className="text-sm mt-6 text-gray-500">10 из 20 стилей</p>
      <div className="mt-6 flex ">
        <button
          disabled
          className="flex items-center justify-center size-12  bg-white rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-800 disabled:text-gray-200 disabled:hover:bg-white"
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
        <button className="flex items-center justify-center size-12  bg-gray-200 rounded-md hover:bg-gray-200 text-gray-800 hover:text-gray-800 font-semibold">
          1
        </button>
        <button className="flex items-center justify-center size-12  bg-white rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700">
          2
        </button>
        <button className="flex items-center justify-center size-12  bg-white rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700">
          3
        </button>
        <button className="flex items-center justify-center size-12  bg-white rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-800 disabled:text-gray-200 disabled:hover:bg-white">
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
        <label htmlFor="style-filter" className="sr-only">
          Количество элементов на странице:
        </label>
        <select
          className="flex-grow p-2 pr-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-gray-400"
          id="style-filter"
        >
          <option value="">10</option>
          <option value="style1">20</option>
          <option value="style2">30</option>
        </select>
      </div>
    </div>
  );
}
