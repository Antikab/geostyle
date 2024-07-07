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
          className="bg-white border border-gray-300 text-gray-800 font-semibold hover:brightness-95"
        >
          Редактировать
        </Button>
      ) : (
        <Button
          onClick={handleCancel}
          className="bg-white border border-gray-300 text-gray-800 font-semibold hover:brightness-95"
        >
          Отмена
        </Button>
      )}
      {editLink ? (
        <Button
          onClick={handleDelete}
          className="bg-[#FEE2E2] hover:bg-[#F87171] border border-[#F87171] hover:text-white hover:border-[#e98080]  text-[#B91C1C] focus:outline-none focus:ring focus:ring-red-300"
        >
          Удалить
        </Button>
      ) : (
        <Button
          onClick={handleSave}
          className="border border-blue-700 text-white  bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Сохранить
        </Button>
      )}
    </div>
  );
}
