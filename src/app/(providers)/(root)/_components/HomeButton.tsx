import React from 'react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function HomeButton() {
  return (
    <div>
      <Link href={'/'}>
        <Button className="bg-white">Home</Button>
      </Link>
    </div>
  );
}
