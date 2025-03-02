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
        htmlFor={props.id}
        className="text-gray-700 block text-sm font-medium"
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
