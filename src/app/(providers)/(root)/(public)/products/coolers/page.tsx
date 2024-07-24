'use client';

import Link from 'next/link';
import { SyncLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import { getCoolers } from '@/app/_api/supabase';
import { Cooler } from '@/app/_types/Cooler';
import Image from 'next/image';

const CoolersPage = () => {
  const {
    data: coolers,
    isLoading,
    isError
  } = useQuery<Cooler[]>({
    queryKey: ['coolers'],
    queryFn: getCoolers
  });

  console.log('Is Loading:', isLoading);
  console.log('Is Error:', isError);
  console.log('Fetched coolers:', coolers);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SyncLoader color={'#0047A0'} loading={isLoading} size={25} />
      </div>
    );
  }

  if (isError) return <p>Error loading coolers</p>;

  if (!coolers || coolers.length === 0) {
    return <p>No coolers found</p>;
  }

  return (
    <div className="container mx-auto p-4 bg-slate-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Coolers List</h1>
      <div className="space-y-6">
        {coolers?.map((cooler) => (
          <div
            key={cooler.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex hover:shadow-lg transition-shadow duration-200"
          >
            {cooler.image_urls && cooler.image_urls.length > 0 && (
              <Image src={cooler.image_urls[0]} alt={cooler.name} className="w-28 h-28 object-cover rounded-lg mr-6" />
            )}
            <div className="flex flex-col justify-between">
              <div className="flex gap-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{cooler.name}</h2>
                </div>
                <div>
                  <p className="text-gray-700 mb-4">Category: {cooler.category}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-4">Description: {cooler.description}</p>
                </div>
                <div>
                  <p className="text-gray-600">Tech Spec: {cooler.tech_spec}</p>
                </div>
              </div>
              <Link href={`/products/coolers/${cooler.id}`}>
                <button className="px-4 py-2 bg-main-color text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-gray-300">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoolersPage;
