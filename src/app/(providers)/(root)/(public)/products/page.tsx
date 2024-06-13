import React from 'react';
import ProductCard from './_components/ProductCard';
import ProductTab from './_components/ProductTab';

export default function ProductsPage() {
  return (
    <div>
      <div>
        <ProductTab />
      </div>
      <ProductCard />
    </div>
  );
}
