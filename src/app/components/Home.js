'use client';
import { useState, useEffect } from 'react';
import Header from './Header';
import SearchForm from './SearchForm';
import Pagination from './Pagination';
import StyleCard from './StyleCard';

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
    <>
      <Header title="Стили для Geoserver" />
      <div className="bg-white border border-gray-200 shadow-sm p-4 rounded-lg">
        <SearchForm />
        <Pagination />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 mt-8">
        {geoStyles.map(item => (
          <StyleCard
            key={item.id}
            name={item.name}
            description={item.description}
            link={`/${item.id}`}
            image={item.image}
          />
        ))}
      </div>
    </>
  );
}
