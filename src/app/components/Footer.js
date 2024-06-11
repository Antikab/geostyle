'use client';
import Link from 'next/link';

export default function Footer({ button1, button2, editLink, handleCancel }) {
  return (
    <div className="flex justify-end gap-4  p-8">
      {editLink ? (
        <Link
          className="py-2 px-4 bg-white border border-gray-300 text-gray-800 rounded-lg shadow-sm font-semibold"
          href={editLink}
        >
          {button1}
        </Link>
      ) : (
        <button
          className="py-2 px-4 bg-white border border-gray-300 text-gray-800 rounded-lg shadow-sm font-semibold"
          onClick={handleCancel}
        >
          {button1}
        </button>
      )}

      <button className="py-2 px-4 bg-[#FEE2E2] border border-[#F87171] text-[#B91C1C] rounded-lg shadow-sm">
        {button2}
      </button>
    </div>
  );
}
