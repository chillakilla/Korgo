import { supabase } from '../supabaseClient';

// supabase CRUD Operations

export const getMotors = async () => {
  const { data, error } = await supabase.from('motors').select('*');

  console.log('Data:', data);
  console.log('Error:', error);

  if (error) throw new Error(error.message);
  return data;
};

export const getMotorById = async (id: string) => {
  const { data, error } = await supabase.from('motors').select('*').eq('id', id).single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const addProduct = async (product: { name: string; category: string; isNew: boolean }) => {
  const { data, error } = await supabase.from('products').insert([product]);
  if (error) throw error;
  return data;
};

export const updateProduct = async (
  productId: string,
  updates: { name?: string; category?: string; isNew?: boolean }
) => {
  const { data, error } = await supabase.from('products').update(updates).eq('id', productId);
  if (error) throw error;
  return data;
};

export const deleteProduct = async (productId: string) => {
  const { data, error } = await supabase.from('products').delete().eq('id', productId);
  if (error) throw error;
  return data;
};

export const addProductToWishlist = async (productId: string) => {
  const { data, error } = await supabase.from('wishlist').insert([{ product_id: productId }]);
  if (error) throw error;
  return data;
};

export const removeProductFromWishlist = async (productId: string) => {
  const { data, error } = await supabase.from('wishlist').delete().eq('product_id', productId);
  if (error) throw error;
  return data;
};
