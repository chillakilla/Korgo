import React from 'react';
import Link from 'next/link';

interface CustomButtonProps {
  href: string;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ href, children }) => {
  return (
    <div className="relative">
      <Link href={href}>
        <button className="flex items-center px-4 py-2 rounded-xl bg-white hover:bg-gray-200 border-main-color bg-white text-main-color font-bold transform transition-transform duration-200 hover:scale-90">
          {children}
        </button>
      </Link>
    </div>
  );
};

export default CustomButton;
