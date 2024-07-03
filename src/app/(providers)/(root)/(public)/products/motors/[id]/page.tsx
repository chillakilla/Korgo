'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getMotorById } from '@/app/api/supabase';
import { NextPage } from 'next';
import { Motor } from '@/app/types/Motor';

const MotorDetailPage: NextPage = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();

  console.log('motor id', id);

  const {
    data: motor,
    isLoading,
    isError
  } = useQuery<Motor>({
    queryKey: ['motor', id],
    queryFn: () => getMotorById(id)
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
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative h-96"></div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{motor.name}</h1>
            <p className="text-gray-600 mb-4">Category: {motor.category}</p>
            <div className="text-gray-800 mb-6">
              <h2 className="text-xl font-bold mb-2">Details</h2>
              <p>{motor.description}</p> {/* Assuming 'description' is a field in your Motor type */}
            </div>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotorDetailPage;
