'use client';

import { cn } from '@/lib/utils';
import { formatFileSize } from '@edgestore/react/utils';
import { UploadCloudIcon, X } from 'lucide-react';
import * as React from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';

const variants = {
  base: 'relative rounded-[6px] flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[150px] border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out',
  image:
    'border-[0px] p-[0px] min-h-[0px] min-w-[0px] relative shadow-md bg-slate-200 dark:bg-slate-900 rounded-[6px]',
  active: 'border-[2px]',
  disabled:
    'bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-[0.3] dark:bg-gray-700',
  accept: 'border border-blue-500 bg-blue-500 bg-opacity-[0.1]',
  reject: 'border border-red-700 bg-red-700 bg-opacity-[0.1]',
};

type InputProps = {
  width: number;
  height: number;
  className?: string;
  value?: File | string;
  onChange?: (file?: File) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
  imageUrl?: string;
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return 'Invalid file type.';
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return 'The file is not supported.';
  },
};

const SingleImageDropzone = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { dropzoneOptions, width, height, value, className, disabled, onChange, imageUrl: imageUrlProp },
    ref,
  ) => {
    const imageUrl = React.useMemo(() => {
      if (typeof value === 'string') {
        // in case an url is passed in, use it to display the image
        return value;
      } else if (value) {
        // in case a file is passed in, create a base64 url to display the image
        return URL.createObjectURL(value);
      }
      return imageUrlProp || null;
    }, [value, imageUrlProp]);

    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      acceptedFiles,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: { 'image/*': [] },
      multiple: false,
      disabled,
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
          void onChange?.(file);
        }
      },
      ...dropzoneOptions,
    });

    // styling
    const dropZoneClassName = React.useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          imageUrl && variants.image,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className,
        ).trim(),
      [
        isFocused,
        imageUrl,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ],
    );

    // error validation messages
    const errorMessage = React.useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === 'file-too-large') {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === 'file-invalid-type') {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === 'too-many-files') {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);

    return (
      <div className={cn('relative group', className)}>
        <div
          {...getRootProps({
            className: dropZoneClassName,
            style: {
              width,
              height,
            },
          })}
        >
          {/* Main File Input */}
          <input ref={ref} {...getInputProps()} />

          {imageUrl ? (
            // Image Preview
            <img
              className="h-[100%] w-[100%] rounded-[6px] object-cover"
              src={imageUrl}
              alt={acceptedFiles[0]?.name}
            />
          ) : (
            // Upload Icon
            <div className="flex flex-col items-center justify-center text-[12px] text-gray-400">
              <UploadCloudIcon className="mb-[8px] h-[28px] w-[28px]" />
              <div className="text-gray-400">drag & drop to upload</div>
              <div className="mt-[12px]">
                <Button type="button" disabled={disabled}>
                  select
                </Button>
              </div>
            </div>
          )}

          {/* Remove Image Icon */}
          {imageUrl && !disabled && (
            <div
              className="group absolute right-[0px] top-[0px] -translate-y-[25%] translate-x-[25%] transform"
              onClick={(e) => {
                e.stopPropagation();
                void onChange?.(undefined);
              }}
            >
              <div className="flex h-[20px] w-[20px] items-center justify-center rounded-[6px] border border-solid border-gray-500 bg-white transition-all duration-300 hover:h-[24px] hover:w-[24px] dark:border-gray-400 dark:bg-black">
                <X
                  className="text-gray-500 dark:text-gray-400"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          )}
        </div>

        {/* Error Text */}
        <div className="mt-[4px] text-[12px] text-red-500">{errorMessage}</div>
      </div>
    );
  },
);
SingleImageDropzone.displayName = 'SingleImageDropzone';

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      className={twMerge(
        // base
        'focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center rounded-[6px] text-[14px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-[1px] disabled:pointer-events-none disabled:opacity-[0.5]',
        // color
        'border border-gray-400 text-gray-400 shadow hover:bg-gray-100 hover:text-gray-500 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700',
        // size
        'h-[24px] rounded-[6px] px-[8px] text-[12px]',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { SingleImageDropzone };