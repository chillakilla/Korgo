'use client';

import React from 'react';
import { IoMailOpenOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';

const FooterContent = () => {
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
    <div className="flex flex-col justify-center items-center p-2.5">
      <div>
        <p className="font-bold text-3xl p-1">Contact Us</p>
      </div>
      <div onClick={copyToClipboard} className="flex p-1 hover:cursor-pointer hover:bg-white hover:rounded-xl">
        <div className="p-1">
          <IoMailOpenOutline className="size-7" />
        </div>
        <div className="p-1.5">{myEmail}</div>
      </div>
    </div>
  );
};

export default FooterContent;
