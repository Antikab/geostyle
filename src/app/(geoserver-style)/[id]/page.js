'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState, useEffect } from 'react';
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from '@headlessui/react';
import Button from '../../components/Button';
import Image from 'next/image';
import { fetchStyleId, fetchDeleteStyle } from '../../utils/api';
import { useRouter } from 'next/navigation';

export default function ViewStyle({ params }) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [styleId, setStyleId] = useState({}); // Состояние для данных стиля
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false); // Состояние для увеличенного изображения

  const handleZoomIn = () => setIsZoomed(true); // функции для обработки кликов на изображение для его увеличения
  const handleZoomOut = () => setIsZoomed(false); // функции для обработки кликов на изображение для его уменьшения.

  const editLink = `${params.id}/edit/`;
  const router = useRouter();

  const handleCopyToClipboard = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  // Загрузка данных стиля
  useEffect(() => {
    async function loadStyleId() {
      try {
        const data = await fetchStyleId(params.id);
        setStyleId(data);
      } catch (error) {
        setError('Не удалось загрузить стиль.');
      } finally {
        setLoading(false);
      }
    }
    loadStyleId();
  }, [params.id]);

  // Функция для обработки удаления стиля
  const deleteStyle = async () => {
    try {
      const data = await fetchDeleteStyle(params.id);
      console.log('Стиль успешно удален:', data);

      // Устанавливаем сообщение об успешном удалении
      setSuccessMessage('Стиль успешно удален');

      // Добавляем задержку перед перенаправлением
      setTimeout(() => {
        router.push('/');
      }, 600);
    } catch (error) {
      console.error('Ошибка при удалении стиля:', error);
      setError('Не удалось удалить стиль.');
    } finally {
      setIsOpen(false);
    }
  };

  // Очистка сообщения через 5 секунд
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 500);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  if (loading) {
    return (
      <svg
        className="animate-spin size-14 my-0 mx-auto col-span-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g transform="rotate(360 12 12)">
          <circle
            cx={12}
            cy={2.5}
            r={1.5}
            fill="currentColor"
            opacity={0.14}
          ></circle>
          <circle
            cx={16.75}
            cy={3.77}
            r={1.5}
            fill="currentColor"
            opacity={0.29}
          ></circle>
          <circle
            cx={20.23}
            cy={7.25}
            r={1.5}
            fill="currentColor"
            opacity={0.43}
          ></circle>
          <circle
            cx={21.5}
            cy={12}
            r={1.5}
            fill="currentColor"
            opacity={0.57}
          ></circle>
          <circle
            cx={20.23}
            cy={16.75}
            r={1.5}
            fill="currentColor"
            opacity={0.71}
          ></circle>
          <circle
            cx={16.75}
            cy={20.23}
            r={1.5}
            fill="currentColor"
            opacity={0.86}
          ></circle>
          <circle cx={12} cy={21.5} r={1.5} fill="currentColor"></circle>
        </g>
      </svg>
    );
  }

  if (error) {
    return (
      <div className="relative flex items-center rounded-md justify-center flex-nowrap gap-4 border p-4 font-medium text-lg border-red-200 bg-red-100 text-red-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-0.5 size-8"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" x2="12" y1="8" y2="12"></line>
          <line x1="12" x2="12.01" y1="16" y2="16"></line>
        </svg>
        {error}
      </div>
    );
  }

  const imageString = styleId.image || 'Нет данных';
  const nameString = styleId.name || 'Нет данных';
  const codeString = styleId.code || 'Нет данных';
  return (
    <>
      <Header title={`Стиль - ${nameString}`} />
      <div className="flex flex-grow items-start gap-12 bg-white border border-gray-200 rounded-t-lg shadow-sm p-8 ">
        <div className="relative">
          <svg
            className="absolute z-10 inset-0 size-10 top-5 left-5 text-gray-300 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path
              fill="currentColor"
              d="M512 128H219l338 339l-90 90l-339-338v293H0V0h512zM1536 0h512v512h-128V219l-339 338l-90-90l338-339h-293zM467 1491l90 90l-338 339h293v128H0v-512h128v293zm1453 338v-293h128v512h-512v-128h293l-338-339l90-90zM640 1408V640h768v768zm128-640v512h512V768z"
            ></path>
          </svg>
          <Image
            className="border border-gray-200 rounded-lg size-96 object-contain cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
            src={imageString}
            alt="Preview"
            width={500}
            height={500}
            priority={true}
            quality={100}
            sizes="100vw"
            onClick={handleZoomIn}
          />
        </div>

        <div className=" overflow-x-auto flex p-5 flex-grow rounded-lg items-center border border-gray-200 relative bg-[#282a36]">
          <div
            className={`absolute top-1 right-4 hover:text-gray-200 text-gray-400 ${
              copied && 'hover:text-lime-200 text-lime-400'
            }`}
          >
            <CopyToClipboard text={codeString} onCopy={handleCopyToClipboard}>
              <button className="transition-colors duration-300 px-2 py-1 rounded">
                {copied ? 'Скопировано' : 'Скопировать код'}
              </button>
            </CopyToClipboard>
          </div>
          <SyntaxHighlighter
            className="flex flex-grow min-w-full"
            language="css"
            style={dracula}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      </div>
      {/* Всплывающее сообщение об успешном удалении стиля*/}
      {successMessage && (
        <div className="relative flex items-center justify-center rounded-md flex-nowrap gap-4 border p-4 font-medium text-lg border-green-200 bg-green-100 text-green-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 size-8"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="8" y2="12"></line>
            <line x1="12" x2="12.01" y1="16" y2="16"></line>
          </svg>
          {successMessage}
        </div>
      )}
      <Footer editLink={editLink} handleDelete={() => setIsOpen(true)} />

      <Transition
        show={isOpen}
        enter="duration-200 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-800/50">
            <DialogPanel className=" w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl border-t-4 border-t-red-500">
              <DialogTitle
                as="div"
                className="flex items-center justify-between text-lg font-semibold"
              >
                <div className="flex items-center gap-4">
                  <span className="flex justify-center items-center gap-2 size-10 bg-red-500 rounded">
                    <svg
                      className="size-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <p className="self-start">Удалить?</p>
                </div>
                <svg
                  onClick={() => setIsOpen(false)}
                  style={{ cursor: 'pointer' }}
                  className="self-start size-5 -mt-4 -mr-2 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </DialogTitle>
              <Description
                as="div"
                className="flex flex-col items-start justify-center pt-2 pb-8 px-14"
              >
                <p>
                  Вы уверены, что хотите удалить этот стиль?{' '}
                  <span className="text-base font-semibold">
                    Действие необратимо.
                  </span>
                </p>
              </Description>
              <div className="flex justify-end gap-4 bg-gray-100 pt-5 -mx-6 -mb-6 p-5 border-t border-t-gray-200 rounded-b-xl">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="bg-white border border-gray-300 text-gray-800 font-semibold hover:brightness-95"
                >
                  Отмена
                </Button>
                <Button
                  onClick={deleteStyle}
                  className="bg-[#FEE2E2] hover:bg-[#F87171] border border-[#F87171] hover:text-white hover:border-[#e98080]  text-[#B91C1C] focus:outline-none focus:ring focus:ring-red-300"
                >
                  Удалить
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
      {/* Модальное окно для увеличенного изображения */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleZoomOut}
        >
          <Image
            className="object-contain"
            src={imageString}
            alt="Preview"
            fill
            sizes="100vw"
            priority={true}
            quality={100}
          />
        </div>
      )}
    </>
  );
}
