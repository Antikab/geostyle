'use client';
import Button from './Button';

export default function Footer({
  editLink,
  handleCancel,
  handleDelete,
  handleSave,
}) {
  return (
    <div className="flex justify-end bg-gray-100 border-x border-b border-gray-200 rounded-b-lg rounded-x-lg shadow-sm gap-4 p-8">
      {editLink ? (
        <Button
          href={editLink}
          className="bg-white border border-gray-300 text-gray-800 font-semibold"
        >
          Редактировать
        </Button>
      ) : (
        <Button
          onClick={handleCancel}
          className="bg-white border border-gray-300 text-gray-800 font-semibold"
        >
          Отмена
        </Button>
      )}
      {editLink ? (
        <Button
          onClick={handleDelete}
          className="bg-[#FEE2E2] border border-[#F87171] text-[#B91C1C]"
        >
          Удалить
        </Button>
      ) : (
        <Button
          onClick={handleSave}
          className="bg-blue-600 border border-blue-700  text-white"
        >
          Сохранить
        </Button>
      )}
    </div>
  );
}
