import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';

export default function TopButton() {
  const [isVisible, setIsvisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleScrollToTop = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 100) {
      setIsvisible(true);
    } else {
      setIsvisible(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScrollToTop);
    return () => {
      window.removeEventListener('scroll', handleScrollToTop);
    };
  }, []);

  return (
    <div>
      <Button
        onClick={scrollToTop}
        className={`${
          isVisible ? 'block' : 'hidden'
        } fixed bottom-4 right-4 bg-main-color hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300 
    `}
      >
        Top
      </Button>
    </div>
  );
}
