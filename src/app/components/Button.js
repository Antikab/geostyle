import Link from 'next/link';

const Button = ({
  href,
  onClick,
  children,
  className,
  type = 'button',
  disabled,
}) => {
  const commonClasses = 'py-2 px-4 rounded-lg shadow-sm font-semibold';

  if (href) {
    return (
      <Link className={`${commonClasses} ${className}`} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${commonClasses} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
