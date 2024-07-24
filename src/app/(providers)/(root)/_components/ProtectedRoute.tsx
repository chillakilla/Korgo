'use client';

import React from 'react';
import { useAuth } from '@/app/_context/AuthContext';
import { useRouter } from 'next/navigation';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>; // You can show a loader or skeleton screen here
  }

  if (!user) {
    router.replace('/login'); // Redirect to login page if not authenticated
    return null; // Render nothing while redirecting
  }

  return <>{children}</>;
};

export default ProtectedRoute;
