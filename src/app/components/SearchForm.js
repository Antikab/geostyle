'use client';

export default function SearchForm() {
  return (
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
        className="py-2 px-4 bg-blue-600 border border-blue-700 text-white font-semibold rounded-lg shadow-sm"
        id="search-button"
      >
        Поиск
      </button>
    </form>
  );
}
