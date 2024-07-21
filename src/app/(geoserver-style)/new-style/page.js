'use client';

import Header from '../../components/Header';
import StyleForm from '../../components/StyleForm'; // Импортируем новый компонент
import { fetchCreateStyle } from '../../utils/api';

export default function NewStyle() {
  const handleCreateStyle = async (values, imageFile) => {
    await fetchCreateStyle(values, imageFile);
  };
  return (
    <>
      <Header title="Создать новый стиль" />
      <StyleForm initialData={{}} onSubmit={handleCreateStyle} isNew />
    </>
  );
}
