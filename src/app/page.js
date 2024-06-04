'use client';
import Link from 'next/link';

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
              className="flex-grow p-2 pr-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-gray-400"
              id="style-filter"
            >
              <option value="">10</option>
              <option value="style1">20</option>
              <option value="style2">30</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 mt-8">
        <div className="flex bg-white border border-gray-200 rounded-lg shadow-sm p-8">
          <div className=" flex items-center justify-center border border-gray-200">
            <svg
              className="size-60 object-cover rounded-lg"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z"
              />
            </svg>
          </div>
          <div className="w-2/3 flex flex-col justify-between ml-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-gray-900">Название</h2>
              <p className="text-base text-gray-900">
                Описание для этой карточки
              </p>
            </div>
            <Link
              href="/"
              className="flex items-center gap-3 self-end text-base text-blue-700"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 3H21V9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 14L21 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Открыть код
            </Link>
          </div>
        </div>
        <div className="flex bg-white border border-gray-200 rounded-lg shadow-sm p-8">
          <div className=" flex items-center justify-center border border-gray-200">
            <svg
              className="size-60 object-cover rounded-lg"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z"
              />
            </svg>
          </div>
          <div className="w-2/3 flex flex-col justify-between ml-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-gray-900">Название</h2>
              <p className="text-base text-gray-900">
                Описание для этой карточки
              </p>
            </div>
            <Link
              href="/"
              className="flex items-center gap-3 self-end text-base text-blue-700"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 3H21V9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 14L21 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Открыть код
            </Link>
          </div>
        </div>
        <div className="flex bg-white border border-gray-200 rounded-lg shadow-sm p-8">
          <div className=" flex items-center justify-center border border-gray-200">
            <svg
              className="size-60 object-cover rounded-lg"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z"
              />
            </svg>
          </div>
          <div className="w-2/3 flex flex-col justify-between ml-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-gray-900">Название</h2>
              <p className="text-base text-gray-900">
                Описание для этой карточки
              </p>
            </div>
            <Link
              href="/"
              className="flex items-center gap-3 self-end text-base text-blue-700"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 3H21V9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 14L21 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Открыть код
            </Link>
          </div>
        </div>
        <div className="flex bg-white border border-gray-200 rounded-lg shadow-sm p-8">
          <div className=" flex items-center justify-center border border-gray-200">
            <svg
              className="size-60 object-cover rounded-lg"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z"
              />
            </svg>
          </div>
          <div className="w-2/3 flex flex-col justify-between ml-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-gray-900">Название</h2>
              <p className="text-base text-gray-900">
                Описание для этой карточки
              </p>
            </div>
            <Link
              href="/"
              className="flex items-center gap-3 self-end text-base text-blue-700"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 3H21V9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 14L21 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Открыть код
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
