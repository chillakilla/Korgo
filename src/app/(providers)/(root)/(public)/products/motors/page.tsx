'use client';

import Link from 'next/link';
import { SyncLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import { getMotors } from '@/app/api/supabase';
import { Motor } from '@/app/types/Motor';

const MotorsPage = () => {
  const {
    data: motors,
    isLoading,
    isError
  } = useQuery<Motor[]>({
    queryKey: ['motors'],
    queryFn: getMotors
  });

  console.log('Is Loading:', isLoading);
  console.log('Is Error:', isError);
  console.log('Fetched Motors:', motors);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SyncLoader color={'#0047A0'} loading={isLoading} size={25} />
      </div>
    );
  }

  if (isError) return <p>Error loading motors</p>;

  if (!motors || motors.length === 0) {
    return <p>No motors found</p>;
  }

  return (
    <div className="container mx-auto p-4 bg-slate-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Motors List</h1>
      <div className="space-y-6">
        {motors?.map((motor) => (
          <div
            key={motor.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex hover:shadow-lg transition-shadow duration-200"
          >
            {motor.images && motor.images.length > 0 && (
              <img src={motor.images[0]} alt={motor.name} className="w-24 h-24 object-cover rounded-lg mr-6" />
            )}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{motor.name}</h2>
                <p className="text-gray-700 mb-4">Category: {motor.category}</p>
                <p className="text-gray-500 mb-4">{motor.description}</p>
                <p className="text-gray-600 mb-2">Company: {motor.company_name}</p>
                <p className="text-gray-600">Tech Spec: {motor.tech_spec}</p>
              </div>
              <Link href={`/products/motors/${motor.id}`}>
                <p className="text-blue-500 hover:underline">View Details</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotorsPage;
