import Link from 'next/link';
import React from 'react';

export default function ProductTab() {
  return (
    <div className="bg-black h-10 p-1.5">
      <div className="flex items-center gap-2">
        <div className="w-max h-7 bg-white flex justify-center items-center p-1.5 border-r-3 border-main-color rounded-s-lg">
          <Link href={'/products/machine'}>Materials•Parts</Link>
        </div>
        <div className="w-max h-7 bg-white flex justify-center items-center p-1.5 border-r-3 border-main-color rounded-s-lg">
          <Link href={'/products/automatic'}>Automation</Link>
        </div>
        <div className="w-max h-7 bg-white flex justify-center items-center p-1.5 border-r-3 border-main-color rounded-s-lg">
          <Link href={'/products/automatic'}>Manufacturing Equipment</Link>
        </div>
        <div className="w-max h-7 bg-white flex justify-center items-center p-1.5 border-r-3 border-main-color rounded-s-lg">
          <Link href={'/products/automatic'}>Digital</Link>
        </div>
      </div>
    </div>
  );
}
