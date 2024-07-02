'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getMotorById } from '@/app/api/supabase';
import { NextPage } from 'next';
import { Motor } from '@/app/types/Motor';

const MotorDetailPage: NextPage = () => {
  const { id } = useParams();
  const router = useRouter();

  console.log('motor id', id);

  const {
    data: motor,
    isLoading,
    isError
  } = useQuery<Motor>({
    queryKey: ['motor', '1'],
    queryFn: () => getMotorById('1')
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  if (!motor) {
    return <p>No motor found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {motor && (
        <>
          <h1 className="text-2xl font-bold">{motor.name}</h1>
          <img src={motor.img} alt={motor.name} className="w-full h-auto mt-4" />
          <p className="mt-4"> Category: {motor.category}</p>
        </>
      )}
      Motor Detail Page
      {/* <p>유저에게 보여질 것</p>
      <p>motor.name</p>
      <p>motor.category</p>
      <p>motor.image</p>
      <p>motor.description</p>
      <p>motor.techSpec</p>
      <p>motor.created_at</p>
      <p>유저에게 보여지지 않는 것</p>
      <p>motor.company</p>
      <p>motor.modelNumber</p> */}
    </div>
  );
};

export default MotorDetailPage;
