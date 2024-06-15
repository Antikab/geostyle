'use client';
import Button from './Button';

export default function Footer({ editLink, handleCancel, handleDelete }) {
  return (
    <div className="flex justify-end gap-4 p-8">
      {editLink ? (
        <Button
          href={editLink}
          className="bg-white border border-gray-300 text-gray-800"
        >
          Редактировать
        </Button>
      ) : (
        <Button
          onClick={handleCancel}
          className="bg-white border border-gray-300 text-gray-800"
        >
          Отменить
        </Button>
      )}

      <Button
        onClick={handleDelete}
        className="bg-[#FEE2E2] border border-[#F87171] text-[#B91C1C] font-normal"
      >
        Удалить
      </Button>
    </div>
  );
}
