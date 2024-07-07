export default function InputField({
  id,
  label,
  register,
  errors,
  placeholder,
  heightClass,
  isTextArea,
}) {
  const Component = isTextArea ? 'textarea' : 'input';
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <Component
        type="text"
        placeholder={placeholder}
        id={id}
        {...register(id)}
        className={`border ${errors ? 'border-red-500' : 'border-gray-300'} 
         rounded px-4 py-2 shadow-sm ${heightClass} focus:outline-none 
         focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-gray-400`}
      />
      {errors && <p className="text-red-500 text-sm">{errors.message}</p>}
    </>
  );
}
