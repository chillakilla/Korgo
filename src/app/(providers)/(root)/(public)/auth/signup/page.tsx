'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import SignUpForm from '../../../_components/SignUpForm';

const SignUpPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div>
          <button
            onClick={() => router.push('/')}
            className="absolute top-15 left-15 bg-main-color text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-300"
          >
            Return
          </button>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
