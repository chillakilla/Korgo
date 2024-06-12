'use client';

import React from 'react';
import DropDownMenu from './DropDownMenu';
import HomeButton from './HomeButton';

export default function MenuBar() {
  return (
    <div className="w-full h-14 bg-main-color flex">
      <div className="ml-4 p-2">
        <HomeButton />
      </div>
      <div className="p-1">
        <DropDownMenu />
      </div>
    </div>
  );
}
