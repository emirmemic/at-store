import { useTranslations } from 'next-intl';
import * as React from 'react';

import { cn } from '@/lib/utils/utils';

import InputErrorMessage from './input-error-message';

export interface FileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  onFileChange?: (files: File[] | null) => void;
}
export interface FileInputRef {
  clear: () => void;
}

const InputFileUpload = React.forwardRef<FileInputRef, FileInputProps>(
  ({ className, errorMessage, onFileChange, multiple, ...props }, ref) => {
    const t = useTranslations('input');
    // States
    const [fileNames, setFileNames] = React.useState<string[] | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);

    // Derived state
    const generatedId = React.useId();
    const id = props.id || `file-upload-${generatedId}`;
    const hasSuccess = fileNames && fileNames.length > 0;
    const stateClass = cn(
      'cursor-pointer rounded-[32px] border px-3 py-2 text-center transition-colors duration-300 footer-navigation w-fit',
      {
        'border-black text-black': !errorMessage && !hasSuccess,
        'border-green text-green': hasSuccess && !errorMessage,
        'border-red-deep text-red-deep': errorMessage,
      },
      className
    );

    // Handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files ? Array.from(e.target.files) : null;
      const names = selectedFiles?.map((file) => file.name) || null;
      setFileNames(names);
      onFileChange?.(selectedFiles);
    };

    const preventDefaultHandler = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
      preventDefaultHandler(e);
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      const names = droppedFiles.map((file) => file.name);
      setFileNames(names);
      onFileChange?.(droppedFiles);
    };
    const handleDragEnter = (e: React.DragEvent) => {
      preventDefaultHandler(e);
      setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      preventDefaultHandler(e);
      setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
      preventDefaultHandler(e);
    };

    // Expose clear method to parent component and clear input value
    React.useImperativeHandle(ref, () => {
      const inputElement = document.getElementById(id) as HTMLInputElement;
      return {
        ...inputElement,
        clear: () => {
          setFileNames(null);
          if (inputElement) {
            inputElement.value = '';
          }
        },
      };
    });

    return (
      <div className="flex flex-col gap-3">
        <label
          className={cn(stateClass, {
            'border-blue text-blue': isDragging,
          })}
          htmlFor={id}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {hasSuccess ? t('fileAdded') : t('selectFile')}
        </label>

        {fileNames && fileNames.length > 0 && (
          <div className="text-grey-darker footer-text">
            {fileNames.map((name, index) => (
              <p key={index} className="text-grey-darker">
                {name}
              </p>
            ))}
          </div>
        )}
        <input
          className="hidden"
          id={id}
          multiple={multiple}
          type="file"
          onChange={handleChange}
          {...props}
        />

        {errorMessage && (
          <InputErrorMessage
            className="footer-text"
            errorMessage={errorMessage}
          />
        )}
      </div>
    );
  }
);

InputFileUpload.displayName = 'InputFileUpload';

export { InputFileUpload };
