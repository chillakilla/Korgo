'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/app/supabaseClient';
import Swal from 'sweetalert2';

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dob: string;
  fieldOfInterest: string;
}

interface SignUpFormErrors {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dob: string;
  fieldOfInterest: string;
}

interface FieldValidationStatus {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
  firstName: boolean;
  lastName: boolean;
  dob: boolean;
  fieldOfInterest: boolean;
}

const SignUpForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const initialValidationStatus: FieldValidationStatus = {
    email: false,
    password: false,
    confirmPassword: false,
    firstName: false,
    lastName: false,
    dob: false,
    fieldOfInterest: false
  };

  const [signUpFormData, setSignUpFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dob: '',
    fieldOfInterest: ''
  });
  const [errors, setErrors] = useState<SignUpFormErrors>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dob: '',
    fieldOfInterest: ''
  });
  const [validationStatus, setValidationStatus] = useState<FieldValidationStatus>(initialValidationStatus);

  const validateField = (name: keyof SignUpFormData, value: string) => {
    let error = '';

    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
          error = 'Please enter a valid email';
        }
        break;
      case 'password':
        const passwordRegex = /^(?=.*[!@#$%^&*])/;
        if (!value || value.length < 8 || !passwordRegex.test(value)) {
          error = 'Password must be at least 8 characters and include a special character';
        }
        break;
      case 'confirmPassword':
        if (value !== signUpFormData.password) {
          error = 'Passwords do not match';
        }
        break;
      case 'firstName':
        if (!value) {
          error = 'First name is required';
        }
        break;
      case 'lastName':
        if (!value) {
          error = 'Last name is required';
        }
        break;
      case 'dob':
        if (!value) {
          error = 'Date of Birth is required';
        }
        break;
      case 'fieldOfInterest':
        if (!value) {
          error = 'Job Type is required';
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

  // Input Change Function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignUpFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Validate the field and update errors state
    const error = validateField(name as keyof SignUpFormData, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    Swal.fire('Processing', 'Please wait...', 'info');

    const formIsValid = Object.keys(signUpFormData).every((key) => {
      const error = validateField(key as keyof SignUpFormData, signUpFormData[key as keyof SignUpFormData]);
      if (error) {
        setErrors((prev) => ({ ...prev, [key]: error }));
      }
      return !error;
    });

    if (formIsValid) {
      const { email, password, firstName, lastName, dob, fieldOfInterest } = signUpFormData;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { firstName, lastName, dob, fieldOfInterest }
        }
      });

      if (error) {
        Swal.fire('Error', error.message, 'error');
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Sign up successful! Please check your email for confirmation.',
          confirmButtonColor: '#48BB78',
          confirmButtonText: 'OK'
        });
        queryClient.invalidateQueries({ queryKey: ['users'] });
        setSignUpFormData({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          dob: '',
          fieldOfInterest: ''
        });
        setErrors({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          dob: '',
          fieldOfInterest: ''
        });
        setValidationStatus(initialValidationStatus);
      }
    } else {
      Swal.fire('Error', 'Please fix the errors in the form', 'error');
    }
  };

  // Cancel Function
  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Your current form data will be lost.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setSignUpFormData({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          dob: '',
          fieldOfInterest: ''
        });
        setErrors({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          dob: '',
          fieldOfInterest: ''
        });
        setValidationStatus(initialValidationStatus);
        Swal.fire('Cancelled', 'Your form data has been cleared.', 'success');
      }
    });
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
          value={signUpFormData.email}
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
          value={signUpFormData.password}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-#0047A0 focus:border-#0047A0 sm:text-sm"
        />
        {validationStatus.password && <p className="text-green-500 text-sm">Valid password</p>}
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={signUpFormData.confirmPassword}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-#0047A0 focus:border-#0047A0 sm:text-sm"
        />
        {validationStatus.confirmPassword && <p className="text-green-500 text-sm">Passwords match</p>}
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
      </div>
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={signUpFormData.firstName}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-#0047A0 focus:border-#0047A0 sm:text-sm"
        />
        {validationStatus.firstName && <p className="text-green-500 text-sm">Valid first name</p>}
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={signUpFormData.lastName}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-#0047A0 focus:border-#0047A0 sm:text-sm"
        />
        {validationStatus.lastName && <p className="text-green-500 text-sm">Valid last name</p>}
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
      </div>
      <div>
        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
          Date of Birth
        </label>
        <input
          id="dob"
          name="dob"
          type="date"
          value={signUpFormData.dob}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-#0047A0 focus:border-#0047A0 sm:text-sm"
        />
        {validationStatus.dob && <p className="text-green-500 text-sm">Valid date of birth</p>}
        {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
      </div>
      <div>
        <label htmlFor="fieldOfInterest" className="block text-sm font-medium text-gray-700">
          Field of interest
        </label>
        <select
          id="fieldOfInterest"
          name="fieldOfInterest"
          value={signUpFormData.fieldOfInterest}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-#0047A0 focus:border-#0047A0 sm:text-sm"
        >
          <option value="" disabled>
            Which field are you interested in?
          </option>
          <option value="Metal cutting & processing">Metal cutting & processing</option>
          <option value="Automation">Automation</option>
          <option value="Smart Factory">Smart Factory</option>
          <option value="Materials, Parts">Materials, Parts</option>
          <option value="Energy">Energy</option>
        </select>
        {validationStatus.fieldOfInterest && <p className="text-green-500 text-sm">Valid job type</p>}
        {errors.fieldOfInterest && <p className="text-red-500 text-sm">{errors.fieldOfInterest}</p>}
      </div>
      <div className="flex flex-col justify-between gap-4">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white shadow-md bg-main-color hover:bg-blue-600 focus:outline-none focus:bg-gray-300"
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="w-full flex justify-center py-2 px-4 border border-main-color text-sm font-bold rounded-md shadow-md text-gray-700 bg-white hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
