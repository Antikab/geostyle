'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import Pagination from '../components/Pagination';
import StyleCard from '../components/StyleCard';

export default function Home() {
  const [geoStyles, setGeoStyles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/geoStyles');
        const data = await res.json();
        setGeoStyles(data);
      } catch (error) {
        console.error('Ошибка получения геостилей:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="flex flex-col gap-8 h-screen w-screen max-w-7xl my-0 mx-auto py-12 px-8">
      <Header />
      <div className="bg-white border border-gray-200 shadow-sm p-4 rounded-lg">
        <SearchForm />
        <Pagination />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 mt-8">
        {geoStyles.map((item, index) => (
          <StyleCard
            key={index}
            name={item.name}
            description={item.description}
            link={item.link}
            image={item.image}
          />
        ))}
      </div>
    </main>
  );
}
