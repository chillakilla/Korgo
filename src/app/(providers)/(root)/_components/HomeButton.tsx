import React from 'react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function HomeButton() {
  return (
    <div>
      <Link href={'/'}>
        <Button variant="faded" color="primary">
          Home
        </Button>
      </Link>
    </div>
  );
}
