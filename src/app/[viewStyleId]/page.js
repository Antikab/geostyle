'use client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from '@headlessui/react';
import Button from '../components/Button';

export default function ViewStyle({ params }) {
  const [copied, setCopied] = useState(false);
  const editLink = `${params.viewStyleId}/edit/`;
  let [isOpen, setIsOpen] = useState(false);

  const codeString =
    '/* @title a polygon */\n' +
    '* {\n' +
    "  fill: symbol('shape://slash');\n" +
    '  :fill {\n' +
    '    size: 10;\n' +
    '    stroke: #007aff;\n' +
    '    stroke-width: 2px;\n' +
    '    fill-opacity: 0.31;\n' +
    '  }\n' +
    '  stroke: #007aff;\n';
  '/*-------------------- код ------------------ */\n' +
    '/*-------------------- мой ------------------ */\n' +
    '/*-------------------- код ------------------ */';
  return (
    <>
      <Header title={`Стиль ${params.viewStyleId}`} />
      <div className="flex flex-grow items-start gap-12 bg-white border border-gray-200 rounded-lg shadow-sm p-8 ">
        <div className="flex items-start justify-center border border-gray-200">
          <svg
            className="size-96 object-cover rounded-lg"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z"
            />
          </svg>
        </div>
        <div className=" overflow-x-auto flex p-5 flex-grow rounded-lg items-center border border-gray-200 relative bg-[#282a36]">
          <div className="absolute top-1 right-4 text-gray-400">
            <CopyToClipboard
              text={codeString}
              onCopy={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1000);
              }}
            >
              <button className="transition-colors duration-300  hover:text-white px-2 py-1 rounded">
                {copied ? 'Скопировано' : 'Скопировать код'}
              </button>
            </CopyToClipboard>
          </div>
          <SyntaxHighlighter
            className="flex  flex-grow min-w-full"
            language="css"
            style={dracula}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      </div>
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
                  className="bg-white border border-gray-300 text-gray-800"
                >
                  Отменить
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="bg-[#FEE2E2] border border-[#F87171] text-[#B91C1C] font-normal"
                >
                  Удалить
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
