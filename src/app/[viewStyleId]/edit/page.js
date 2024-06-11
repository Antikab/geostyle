'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useRouter } from 'next/navigation';

export default function ViewStyle({ params }) {
  const router = useRouter();
  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <Header title={`Редактировать стиль ${params.viewStyleId}`} />
      <div className="flex flex-grow items-start gap-12 bg-white border border-gray-200 rounded-lg shadow-sm p-8 ">
        <div className="flex items-start justify-center border border-gray-200"></div>
      </div>
      <Footer
        button1={'Отмена'}
        button2={'Сохранить'}
        handleCancel={handleCancel}
      />
    </>
  );
}
