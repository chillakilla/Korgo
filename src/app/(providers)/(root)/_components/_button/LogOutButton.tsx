import React from 'react';
import { supabase } from '@/app/supabaseClient';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_context/AuthContext';
import Swal from 'sweetalert2';

const LogOutButton: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (!user) {
      await Swal.fire({
        title: 'Not Logged In',
        text: 'You need to be logged in to log out.',
        icon: 'info',
        confirmButtonText: 'OK'
      });
      router.push('/auth/login'); // Adjust the path as needed
      return;
    }

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          throw error;
        }
        console.log('User logged out successfully');

        router.push('/auth/login');
      } catch (error) {
        console.error('Error logging out:', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an error logging out.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } else if (result.isDismissed) {
      router.push('/');
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="w-max flex items-center px-4 py-2 rounded-xl bg-white hover:bg-gray-200 border-main-color text-main-color font-bold transform transition-transform duration-200 hover:scale-90"
    >
      Log Out
    </button>
  );
};

export default LogOutButton;
