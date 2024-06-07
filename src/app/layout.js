import { Open_Sans } from 'next/font/google';
import '../app/globals.css';

const openSans = Open_Sans({ subsets: ['cyrillic'] });

export const metadata = {
  title: 'Стили для геосервера',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${openSans.className} h-screen w-screen bg-gray-100`}>
        <main className="flex flex-col gap-8 h-screen w-screen max-w-7xl my-0 mx-auto py-12 px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
