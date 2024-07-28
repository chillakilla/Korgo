'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getMotorById } from '@/app/_api/supabase';
import { Motor } from '@/app/_types/Motor';
import CustomLightbox from '@/app/(providers)/(root)/_components/CustomLightbox';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { useAuth } from '@/app/_context/AuthContext';

const MotorDetailPage = () => {
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const { user, loading } = useAuth();
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

  console.log('image_urls', motor?.image_urls);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  if (!motor) {
    return <p>No motor found</p>;
  }

  const openLightbox = (index: number) => {
    if (!lightboxIsOpen) {
      console.log('Opening Lightbox for index', index);

      setPhotoIndex(index);
      setLightboxIsOpen(true);
    }
  };

  const closeLightbox = () => {
    console.log('Closing LightboxClosing LightboxClosing LightboxClosing Lightbox');
    setLightboxIsOpen(false);
  };

  const showPrevImage = () => {
    setPhotoIndex((prevIndex) => (prevIndex + motor.image_urls.length - 1) % motor.image_urls.length);
  };

  const showNextImage = () => {
    setPhotoIndex((prevIndex) => (prevIndex + 1) % motor.image_urls.length);
  };

  const handleEdit = async () => {
    const result = await Swal.fire({
      title: 'Are you sure you want to edit?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, edit it!'
    });

    if (result.isConfirmed) {
      router.push(`/products/motors/${id}/edit`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Carousel
              centerMode={true}
              centerSlidePercentage={100}
              showArrows={true}
              showThumbs={false}
              infiniteLoop={true}
              dynamicHeight={true}
            >
              {motor.image_urls.map((url, index) => (
                <div key={index} onClick={() => openLightbox(index)}>
                  <Image
                    src={url}
                    alt={`Motor Image ${index + 1}`}
                    width={500}
                    height={500}
                    priority={index === 0}
                    sizes="width: auto, height: auto"
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{motor.name}</h1>
            <p className="text-gray-600 mb-4">Category: {motor.category}</p>
            <div className="text-gray-800 mb-6">
              <h2 className="text-xl font-bold mb-2">Details</h2>
              <p className="whitespace-pre-wrap">{motor.description}</p>
            </div>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-main-color text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-gray-300"
            >
              Back
            </button>
            {user && !loading && (
              <button
                onClick={handleEdit}
                className="px-4 py-2 ml-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:bg-yellow-700"
              >
                Edit
              </button>
            )}
            {/* Add to WishList div
            TODO : 작업필요 */}
            {/* <div>
              <button className="px-4 py-2 bg-main-color text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-gray-300">
                Add to WishList
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {lightboxIsOpen && (
        <CustomLightbox
          images={motor.image_urls}
          photoIndex={photoIndex}
          onClose={closeLightbox}
          onPrev={showPrevImage}
          onNext={showNextImage}
        />
      )}
    </div>
  );
};

export default MotorDetailPage;
