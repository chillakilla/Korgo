'use client';

import React from 'react';
import MenuButton from './_button/MenuButton';
import CustomButton from './_button/CustomButton';

const MenuBar: React.FC = () => {
  return (
    <div className="flex justify-between">
      <div className="w-full h-14 bg-main-color flex">
        <div className="ml-4 p-2">
          <CustomButton href={'/'}>Home</CustomButton>
        </div>
        <div className="flex items-center justify-center p-2">
          <MenuButton />
        </div>
        <div className="flex items-center justify-center p-2">
          <CustomButton href={'/about'}>About</CustomButton>
        </div>
      </div>
      {/* Auth container */}
      <div className="flex h-14 bg-main-color">
        <div className="w-max flex items-center justify-center p-2 mr-4">
          <CustomButton href={'/admin'}>Admin</CustomButton>
        </div>
        <div className="flex items-center justify-center p-2">
          <CustomButton href={'/auth/login'}>Login</CustomButton>
        </div>
        <div className="w-max flex items-center justify-center p-2 mr-4">
          <CustomButton href={'/auth/signup'}>Sign Up</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
