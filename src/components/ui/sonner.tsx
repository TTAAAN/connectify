"use client";

import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: 'group toast bg-white text-gray-900 border-gray-300 shadow-lg',
          title: 'text-gray-900 font-bold text-base',
          description: 'text-gray-800 text-sm',
          success: 'bg-green-100 border-green-500 text-green-900 [&_[data-title]]:text-green-900 [&_[data-description]]:text-green-800',
          error: 'bg-red-100 border-red-500 text-red-900 [&_[data-title]]:text-red-900 [&_[data-description]]:text-red-800',
          info: 'bg-blue-100 border-blue-500 text-blue-900 [&_[data-title]]:text-blue-900 [&_[data-description]]:text-blue-800',
          warning: 'bg-yellow-100 border-yellow-600 text-yellow-900 [&_[data-title]]:text-yellow-900 [&_[data-description]]:text-yellow-800',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
