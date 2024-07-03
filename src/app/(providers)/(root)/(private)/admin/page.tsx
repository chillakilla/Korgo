'use client';

import React, { useState } from 'react';
import AddMotorForm from '../../_components/AddMotorForm';
import { addMotor } from '@/app/api/supabase';
import { FormData } from '@/app/types/FormData';
import Swal from 'sweetalert2';
import { useScroll } from 'framer-motion';

const AdminPage: React.FC = () => {
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await addMotor(formData);

      Swal.fire({
        title: 'Success!',
        text: 'Added Successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      setFormKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error('Error adding motor', error);

      Swal.fire({
        title: 'Error!',
        text: 'There was an error adding the product.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Add Motor</h1>
      <AddMotorForm key={formKey} onSubmit={handleSubmit} />
    </div>
  );
};

export default AdminPage;
