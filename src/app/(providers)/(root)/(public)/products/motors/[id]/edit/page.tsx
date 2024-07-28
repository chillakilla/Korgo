'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getMotorById, updateMotorById } from '@/app/_api/supabase';
import { Motor } from '@/app/_types/Motor';
import { FormData } from '@/app/_types/FormData';
import EditMotorForm from '@/app/(providers)/(root)/_components/EditMotorForm';
import Swal from 'sweetalert2';
import ProtectedRoute from '@/app/(providers)/(root)/_components/ProtectedRoute';

const EditMotorPage: React.FC = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const [initialFormData, setInitialFormData] = useState<FormData | null>(null);

  const { data, isLoading, isError } = useQuery<Motor>({
    queryKey: ['motor', id],
    queryFn: () => getMotorById(id)
  });

  useEffect(() => {
    if (data) {
      setInitialFormData({
        name: data.name,
        category: data.category,
        company_name: data.company_name,
        description: data.description,
        tech_spec: data.tech_spec,
        model_number: data.model_number,
        image_urls: data.image_urls
      });
    }
  }, []);

  const handleSubmit = async (formData: FormData, files: File[]) => {
    try {
      const result = await updateMotorById(id, formData, files);
      console.log('Item updated successfully Edit page console.log', result);

      Swal.fire({
        title: 'Success!',
        text: 'Updated Successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      router.push(`/products/motors/${id}`);
    } catch (error) {
      console.error('Error updating motor', error);

      Swal.fire({
        title: 'Error!',
        text: 'There was an error updating the product.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !initialFormData) {
    return <p>Error loading motor details</p>;
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Edit Motor</h1>
        <EditMotorForm initialData={initialFormData} onSubmit={handleSubmit} />
      </div>
    </ProtectedRoute>
  );
};

export default EditMotorPage;
