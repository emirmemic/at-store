interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormField({
  label,
  error,
  className,
  ...props
}: FormFieldProps) {
  return (
    <div className="form-group">
      <label
        className="block text-sm font-medium text-gray-700"
        htmlFor={props.id}
      >
        {label}
      </label>
      <input
        {...props}
        className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-pink-500 ${
          error ? 'border-red-500' : 'border-gray-300 focus:border-pink-500'
        } ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
