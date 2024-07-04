'use client';

import React, { useState } from 'react';
import AddMotorForm from '../../_components/AddMotorForm';
import { addMotor, uploadImages } from '@/app/api/supabase';
import { FormData } from '@/app/types/FormData';
import Swal from 'sweetalert2';
import { useScroll } from 'framer-motion';

const AdminPage: React.FC = () => {
  const [formKey, setFormKey] = useState(0);

  const handleImageUpload = async (files: File[]) => {
    try {
      const imageUrls = await uploadImages(files);
      return imageUrls;
    } catch (error) {
      console.error('Error uploading images:');
      Swal.fire({
        title: 'Error!',
        text: 'There was an error uploading the images.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      throw error;
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await addMotor(formData);
      console.log('Motor added successfully Admin page console.log', result);

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
      <AddMotorForm key={formKey} onImageUpload={handleImageUpload} onSubmit={handleSubmit} />
    </div>
  );
};

export default AdminPage;
