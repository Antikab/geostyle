'use client';

export default function Header({ title, newTitle }) {
  return (
    <h1 className="text-gray-900 text-3xl font-semibold pb-8">
      {title || newTitle}
    </h1>
  );
}
