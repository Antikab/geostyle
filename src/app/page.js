'use client';

export default function Home() {
  return (
    <main className="flex flex-col gap-8  h-screen w-screen max-w-7xl my-0 mx-auto py-12 px-8 ">
      <h1 className="text-gray-900 text-3xl font-semibold">
        Стили для Geoserver
      </h1>
      <div className=" bg-white border border-gray-200 shadow-sm p-4 rounded-lg">
        <form
          onSubmit={() => console.log('нашел')}
          className="flex gap-4 search-container"
        >
          <label htmlFor="search-input" className="sr-only">
            Поиск:
          </label>
          <div className="relative flex flex-grow items-center">
            <svg
              className="absolute left-3 h-5 w-5 text-gray-400 "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <input
              className="pl-10 flex-grow p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-gray-400"
              type="text"
              id="search-input"
              placeholder="Поиск по названию / описанию стиля"
            />
          </div>
          <button
            className="py-2 px-4 bg-blue-600 border border-blue-700 text-white rounded-lg shadow-sm"
            id="search-button"
          >
            Поиск
          </button>
        </form>
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
              className="flex-grow p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-gray-400"
              id="style-filter"
            >
              <option value="">10</option>
              <option value="style1">20</option>
              <option value="style2">30</option>
            </select>
          </div>
        </div>
      </div>
    </main>
  );
}
