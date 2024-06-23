'use client';

import React, { useState } from 'react';
import HomeButton from './HomeButton';
import Menu from './Menu';

export default function MenuBar() {
  return (
    <div className="w-full h-14 bg-main-color flex">
      <div className="ml-4 p-2">
        <HomeButton />
      </div>
      <div className="flex items-center justify-center">
        <Menu />
      </div>
    </div>
  );
}
