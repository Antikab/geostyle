'use client';

export default function Header({ title, newTitle }) {
  return (
    <h1 className="xl:text-3xl lg:text-3xl md:text-2xl sm:text-2xl text-xl text-gray-900 font-semibold pb-8">
      {title || newTitle}
    </h1>
  );
}
