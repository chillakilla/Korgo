'use client';

import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';

export default function DropDownMenu() {
  return (
    <div className="w-[6rem] h-[3rem] flex flex-col justify-center items-center">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="faded" className="text-main-color font-semibold hover:bg-main-color hover:text-white">
            Menu
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions">
          <DropdownItem key="products" href="/products">
            Products
          </DropdownItem>
          <DropdownItem key="about" href="/about">
            About
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
