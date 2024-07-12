import { Open_Sans } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({ weight: '400', subsets: ['cyrillic'] });

export const metadata = {
  title: 'Стили для геосервера',
  description: 'CSS Библиотека стилей для геосервера',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${openSans.className}`}>
      <body className="antialiased h-screen w-screen bg-gray-100">
        <main className="flex flex-col  h-fit w-screen max-w-screen-2xl mx-auto py-12 px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
