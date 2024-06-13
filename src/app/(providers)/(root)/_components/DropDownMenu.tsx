'use client';

import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';

export default function DropDownMenu() {
  return (
    <div className="w-[6rem] h-[3rem] flex flex-col justify-center items-center">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="faded" className="border-main-color text-main-color font-bold">
            Menu
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
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
