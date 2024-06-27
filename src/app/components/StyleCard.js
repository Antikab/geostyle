'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function StyleCard({ name, description, link = '/', image }) {
  return (
    <div className="flex bg-white border border-gray-200 rounded-lg shadow-sm p-8">
      <Image
        src={image}
        alt={name}
        className="border  border-gray-200 size-60 object-contain"
        width={500}
        height={500}
        priority={true}
        quality={15}
        sizes="100vw"
      />
      <div className="w-2/3 flex flex-col justify-between ml-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
          <p className="text-base text-gray-900">{description}</p>
        </div>
        <Link
          href={link}
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
  );
}
