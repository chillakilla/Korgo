'use client';

import React, { useState } from 'react';
import AddMotorForm from '../../_components/AddMotorForm';
import { addMotor, addCooler } from '@/app/_api/supabase';
import { FormData } from '@/app/_types/FormData';
import Swal from 'sweetalert2';
import ProtectedRoute from '../../_components/ProtectedRoute';

const AdminPage: React.FC = () => {
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = async (formData: FormData, files: File[]) => {
    try {
      let result;
      if (formData.category === 'motor') {
        result = await addMotor(formData, files);
      } else if (formData.category === 'cooler') {
        result = await addCooler(formData, files);
      }
      console.log('Item added successfully Admin page console.log', result);

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
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Add Motor</h1>
        <AddMotorForm key={formKey} onSubmit={handleSubmit} />
      </div>
    </ProtectedRoute>
  );
};

export default AdminPage;
