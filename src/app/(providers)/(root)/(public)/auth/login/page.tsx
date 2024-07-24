'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/supabaseClient';
import Swal from 'sweetalert2';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email: string;
  password: string;
}

interface FieldValidationStatus {
  email: boolean;
  password: boolean;
}

const LoginPage = () => {
  const router = useRouter();

  const initialValidationStatus: FieldValidationStatus = {
    email: false,
    password: false
  };

  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<LoginFormErrors>({
    email: '',
    password: ''
  });
  const [validationStatus, setValidationStatus] = useState<FieldValidationStatus>(initialValidationStatus);

  const validateField = (name: keyof LoginFormData, value: string) => {
    let error = '';

    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
          error = 'Please enter a valid email';
        }
        break;
      case 'password':
        if (!value || value.length < 8) {
          error = 'Password must be at least 8 characters';
        }
        break;
      default:
        break;
    }

    setValidationStatus((prev) => ({
      ...prev,
      [name]: error === ''
    }));

    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    const error = validateField(name as keyof LoginFormData, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    Swal.fire('Processing', 'Please wait...', 'info');

    const formIsValid = Object.keys(loginFormData).every((key) => {
      const error = validateField(key as keyof LoginFormData, loginFormData[key as keyof LoginFormData]);
      if (error) {
        setErrors((prev) => ({ ...prev, [key]: error }));
      }
      return !error;
    });

    if (formIsValid) {
      const { email, password } = loginFormData;
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        Swal.fire('Error', error.message, 'error');
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Login successful!',
          confirmButtonColor: '#48BB78',
          confirmButtonText: 'OK'
        });
        router.push('/'); // Redirect to the admin page after login
      }
    } else {
      Swal.fire('Error', 'Please fix the errors in the form', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-md rounded-md">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={loginFormData.email}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-#0047A0 focus:border-#0047A0 sm:text-sm"
        />
        {validationStatus.email && <p className="text-green-500 text-sm">Valid email</p>}
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={loginFormData.password}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-#0047A0 focus:border-#0047A0 sm:text-sm"
        />
        {validationStatus.password && <p className="text-green-500 text-sm">Valid password</p>}
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>
      <div className="flex flex-col justify-between gap-4">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white shadow-md bg-main-color hover:bg-blue-600 focus:outline-none focus:bg-gray-300"
        >
          Log In
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
