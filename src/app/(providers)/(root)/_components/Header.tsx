'use client';

import { Input, Spacer } from '@nextui-org/react';
import React from 'react';
import { Button } from '@nextui-org/react';

const Header = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col justify-start items-center p-2 gap-4">
        <p className="text-8xl text-main-color font-bold tracking-wider pointer-events-none select-none">Korgo</p>
        <p className="text-2xl text-main-color pointer-events-none select-none"> Korean Industrial Products</p>
      </div>
      {/* <div className="w-full h-[6.875rem] flex flex-col justify-center items-center">
        <div className="w-[62.5rem] h-[4.688rem] flex justify-center items-center gap-4">
          <Input type="text" placeholder="Search something">
            Search Bar here
          </Input>
          <Button className="border-main-color text-white bg-main-color hover:bg-white hover:text-main-color">
            Search
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default Header;
