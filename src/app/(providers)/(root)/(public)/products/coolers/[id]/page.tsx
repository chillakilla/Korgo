'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCoolerById } from '@/app/_api/supabase';
import { Cooler } from '@/app/_types/Cooler';
import CustomLightbox from '@/app/(providers)/(root)/_components/CustomLightbox';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';

const CoolerDetailPage = () => {
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();

  console.log('cooler id', id);

  const {
    data: cooler,
    isLoading,
    isError
  } = useQuery<Cooler>({
    queryKey: ['cooler', id],
    queryFn: () => getCoolerById(id)
  });

  console.log('image_urls', cooler?.image_urls);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  if (!cooler) {
    return <p>No cooler found</p>;
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
    setPhotoIndex((prevIndex) => (prevIndex + cooler.image_urls.length - 1) % cooler.image_urls.length);
  };

  const showNextImage = () => {
    setPhotoIndex((prevIndex) => (prevIndex + 1) % cooler.image_urls.length);
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
              {cooler.image_urls.map((url, index) => (
                <div key={index} onClick={() => openLightbox(index)}>
                  <Image
                    src={url}
                    alt={`Cooler Image ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{cooler.name}</h1>
            <p className="text-gray-600 mb-4">Category: {cooler.category}</p>
            <div className="text-gray-800 mb-6">
              <h2 className="text-xl font-bold mb-2">Details</h2>
              <p>{cooler.description}</p> {/* Assuming 'description' is a field in your Cooler type */}
            </div>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-main-color text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-gray-300"
            >
              Back
            </button>
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
          images={cooler.image_urls}
          photoIndex={photoIndex}
          onClose={closeLightbox}
          onPrev={showPrevImage}
          onNext={showNextImage}
        />
      )}
    </div>
  );
};

export default CoolerDetailPage;
