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
    <div className="container mx-auto p-4 bg-slate-200">
      <h1 className="text-2xl font-bold mb-4">Motors List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {motors?.map((motor) => (
          <div key={motor.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold mt-2">{motor.name}</h2>
            <p className="mt-1">Category: {motor.category}</p>
            <Link href={`/products/motors/${motor.id}`}>
              <p>View Details</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotorsPage;
