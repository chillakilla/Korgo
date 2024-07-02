'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getMotors } from '@/app/api/supabase';
import { Motor } from '@/app/types/Motor';

const MotorsPage = () => {
  const {
    data: motors,
    isLoading,
    isError
  } = useQuery<Motor[]>({
    queryKey: ['motor', 1],
    queryFn: getMotors
  });

  console.log('Is Loading:', isLoading);
  console.log('Is Error:', isError);
  console.log('Fetched Motors:', motors);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading motors</p>;

  if (!motors || motors.length === 0) {
    return <p>No motors found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Motors List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {motors?.map((motor) => (
          <div key={motor.id} className="border p-4 rounded-lg">
            <img src={motor.img} alt={motor.name} className="w-full h-auto" />
            <h2 className="text-xl font-bold mt-2">{motor.name}</h2>
            <p className="mt-1">Category: {motor.category}</p>
            <Link href={`/motors/${motor.id}`}></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotorsPage;
