import { Input } from '@nextui-org/react';
import React from 'react';
import { Button } from '@nextui-org/react';
import { Spacer } from '@nextui-org/react';

export default function Header() {
  return (
    <div className="w-full flex">
      <Spacer x={56} />
      <div className="w-full h-[6.875rem] flex flex-col justify-center items-center">
        <div className="w-[62.5rem] h-[4.688rem] flex justify-center items-center gap-4">
          <Input type="text" placeholder="Search something">
            Search Bar here
          </Input>
          <Button color="primary" variant="ghost">
            Search
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center p-2">
        <p className="text-8xl text-main-color font-bold">KoPro</p>
      </div>
    </div>
  );
}
