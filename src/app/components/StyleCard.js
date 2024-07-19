import Link from 'next/link';
import Image from 'next/image';

export default function StyleCard({ name, description, link = '/', image }) {
  return (
    <div className="flex flex-col md:flex-row  bg-white border border-gray-200 rounded-lg shadow-sm p-8 gap-8">
      <div className="flex justify-center ">
        <Image
          src={image}
          alt={name}
          className="md:size-60 object-contain border border-gray-200 rounded-lg"
          width={500}
          height={500}
          priority={true}
          quality={20}
          sizes="100vw"
        />
      </div>
      <div className="gap-6 flex justify-center  flex-1 flex-col md:justify-between overflow-hidden">
        <div className="gap-2 flex flex-col">
          <h2 className="2xl:text-3xl xl:text-2xl lg:text-2xl md:text-xl sm:text-xl landscape:md:text-lg portrait:md:text-lg landscape:text-xl portrait:text-lg portrait:sm:text-xl font-semibold text-gray-900 line-clamp-2">
            {name}
          </h2>
          <p className=" text-gray-900 line-clamp-4">{description}</p>
        </div>
        <Link
          href={link}
          className=" flex gap-3 self-center sm:self-end  text-blue-700"
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
