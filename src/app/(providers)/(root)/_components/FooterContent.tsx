'use client';

import React from 'react';
import { IoMailOpenOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';

export default function FooterContent() {
  const myEmail = 'doroome246@gmail.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(myEmail).then(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Copied!',
          text: 'Email copied to clipboard'
        });
      },
      (err) => {
        console.error('Failed to copy email', err);
      }
    );
  };

  return (
    <div className="flex justify-center items-center p-[0.625rem]">
      <div className="p-[0.25rem]">
        <IoMailOpenOutline className="size-7" />
      </div>
      <div onClick={copyToClipboard} className=" p-[0.25rem] hover:cursor-pointer hover:bg-white hover:rounded-xl">
        {myEmail}
      </div>
    </div>
  );
}
