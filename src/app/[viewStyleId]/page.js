'use client';
import Header from '../components/Header';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';

export default function ViewStyle({ params }) {
  const [copied, setCopied] = useState(false);
  const codeString =
    '/* @title a polygon */\n' +
    '* {\n' +
    "  fill: symbol('shape://slash');fill: symbol('shape://slash');fill: symbol('shape://slash');fill: symbol('shape://slash');\n" +
    '  :fill {\n' +
    '    size: 10;\n' +
    '    stroke: #007aff;\n' +
    '    stroke-width: 2px;\n' +
    '    fill-opacity: 0.31;\n' +
    '  }\n' +
    '  stroke: #007aff;\n' +
    '\n' +
    '  stroke-width: 1.8px;\n' +
    '}\n' +
    '[gzk_krt IS not NULL] {\n' +
    '  stroke: #007aff;\n' +
    '  stroke-width: 2px;\n' +
    '  stroke-dasharray: 20 4;\n' +
    '  fill: #5afaf0;\n' +
    '  fill-opacity: 0.31;\n' +
    '}\n' +
    '[gzk_dogovor IS not NULL] {\n' +
    '  stroke: #ff3c00;\n' +
    '\n' +
    '  stroke-width: 2px;\n' +
    '  stroke-dasharray: 20 4;\n' +
    '  fill: #5afaf0;\n' +
    '  fill-opacity: 0.31;\n' +
    '}\n' +
    '\n' +
    '/* @title b polygon */\n' +
    '/*\n' +
    "[@gzk_dogovor <> '']{\n" +
    '    stroke: #ff3c00;\n' +
    '  \n' +
    '    stroke-width: 0.8px;\n' +
    '   \tstroke-dasharray: 5 1;\n' +
    '    fill: #5afaf0;\n' +
    '  \tfill-opacity: 0.31;\n' +
    '  \n' +
    '}\n' +
    '*/\n' +
    '\n' +
    '/*-------------------- мой ------------------ */\n' +
    '/*-------------------- код ------------------ */\n' +
    '/* @title a polygon */\n' +
    '* {\n' +
    "  fill: symbol('shape://slash');\n" +
    '  :fill {\n' +
    '    size: 10;\n' +
    '    stroke: #007aff;\n' +
    '    stroke-width: 2px;\n' +
    '    fill-opacity: 0.31;\n' +
    '  }\n' +
    '  stroke: white, #007aff;\n' +
    '\n' +
    '  stroke-width: 6px, 1.8px;\n' +
    '}\n' +
    '\n' +
    '[gzk_krt IS not NULL] {\n' +
    '  stroke: white, #007aff;\n' +
    '  stroke-width: 6px, 2px;\n' +
    '  stroke-dasharray: none, 20 4;\n' +
    '  fill: #5afaf0;\n' +
    '  fill-opacity: 0, 0.31;\n' +
    '}\n' +
    '\n' +
    '[gzk_dogovor IS not NULL] {\n' +
    '  stroke: white, #ff3c00;\n' +
    '  stroke-width: 6px, 2px;\n' +
    '  stroke-dasharray: none, 20 4;\n' +
    '  fill: #5afaf0;\n' +
    '  fill-opacity: 0, 0.31;\n' +
    '}\n' +
    '\n' +
    '/* @title b polygon */\n' +
    '/*\n' +
    "[@gzk_dogovor <> '']{\n" +
    'stroke: #ff3c00;\n' +
    '\n' +
    'stroke-width: 0.8px;\n' +
    'stroke-dasharray: 5 1;\n' +
    'fill: #5afaf0;\n' +
    'fill-opacity: 0.31;\n' +
    '\n' +
    '}\n' +
    '*/\n' +
    '\n' +
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
    </>
  );
}
