import React from 'react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function HomeButton() {
  return (
    <div>
      <Link href={'/'}>
        <Button variant="faded" className="border-main-color text-main-color font-bold">
          Home
        </Button>
      </Link>
    </div>
  );
}
