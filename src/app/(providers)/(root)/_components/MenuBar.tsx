'use client';

import React from 'react';
import DropDownMenu from './DropDownMenu';

export default function MenuBar() {
  return (
    <div className="w-full h-14 bg-main-color flex flex-col p-2">
      <DropDownMenu />
    </div>
  );
}
