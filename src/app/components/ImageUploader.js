import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

export default function ImageUploader({ onDrop, preview, onRemove }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: false,
  });

  const [isRemovingImage, setIsRemovingImage] = useState(false);

  useEffect(() => {
    setIsRemovingImage(false);
  }, [preview]);

  const handleRemoveImage = event => {
    event.stopPropagation();
    setIsRemovingImage(true);
    onRemove();
  };

  return (
    <div
      {...getRootProps({
        className: `flex size-fit w-auto justify-center items-center border-dashed border-2 hover:cursor-pointer hover:border-gray-400 ${
          isDragActive
            ? 'border-blue-500 bg-blue-500/10 focus:border-blue-500 hover:border-blue-500 text-blue-500'
            : 'border-gray-300'
        }`,
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <span className="size-44 sm:size-60 lg:size-72 flex justify-center items-center text-blue-500 text-center font-semibold ">
          Отлично! теперь <br />
          можете отпустить <br />
          изображение
        </span>
      ) : preview ? (
        <div className="relative">
          <Image
            src={preview}
            alt="Preview"
            width={600}
            height={600}
            priority={true}
          />
          {!isRemovingImage && (
            <svg
              onClick={handleRemoveImage}
              style={{ cursor: 'pointer' }}
              className="flex absolute m-1 top-0 right-0 self-start size-6 text-gray-500 hover:text-red-500 hover:bg-red-100 bg-white border border-gray-200 hover:border-red-200 rounded-lg shadow-sm"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
      ) : (
        <span className="size-44 sm:size-60 lg:size-72 flex justify-center items-center text-gray-500 text-center">
          Перетащите изображение
          <br />в область загрузки
          <br />
          (не больше 4.5 мб)
        </span>
      )}
    </div>
  );
}
