import Link from 'next/link';

const Button = ({
  href,
  onClick,
  children,
  className,
  type = 'button',
  disabled,
}) => {
  // Определяем общие классы
  const commonClasses =
    'flex items-center justify-center text-xs md:text-base py-1 px-2 md:py-2 md:px-4 font rounded-lg hover:drop-shadow-sm';

  // Определяем классы для состояния disabled
  const disabledClasses = disabled && 'cursor-not-allowed opacity-50';

  // Полные классы для кнопки
  const fullClasses = `${commonClasses} ${className} ${disabledClasses}`;

  // Если есть href, возвращаем Link
  if (href) {
    return (
      <Link className={fullClasses} href={href}>
        {children}
      </Link>
    );
  }

  // Иначе возвращаем кнопку
  return (
    <button
      type={type}
      onClick={onClick}
      className={fullClasses}
      disabled={disabled}
    >
      {disabled && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="size-4 md:size-6 inline-block mr-1"
        >
          <path
            fill="currentColor"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity={0.25}
          ></path>
          <path
            fill="currentColor"
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
          >
            <animateTransform
              attributeName="transform"
              dur="0.75s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;360 12 12"
            ></animateTransform>
          </path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
