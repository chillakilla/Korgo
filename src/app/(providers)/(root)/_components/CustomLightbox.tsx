'use client';

import Image from 'next/image';
import React from 'react';

interface CustomLightboxProps {
  images: string[];
  photoIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const CustomLightbox: React.FC<CustomLightboxProps> = ({ images, photoIndex, onClose, onPrev, onNext }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <button className="absolute top-4 right-4 text-white text-6xl" onClick={onClose}>
        &times;
      </button>
      <div className="relative">
        <button
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-6xl bg-black bg-opacity-50 rounded-xl p-2"
          onClick={onPrev}
        >
          &lsaquo;
        </button>
        <Image src={images[photoIndex]} alt={`Lightbox Image ${photoIndex + 1}`} className="max-w-full max-h-screen" />
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-6xl bg-black bg-opacity-50 rounded-xl p-2"
          onClick={onNext}
        >
          &rsaquo;
        </button>
      </div>
    </div>
  );
};

export default CustomLightbox;
