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
              className="pl-10 flex-grow p-2 border border-gray-300 rounded-lg shadow-sm"
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
          <div className="flex ">
            <button className=""></button>
          </div>
        </div>
      </div>
    </main>
  );
}
