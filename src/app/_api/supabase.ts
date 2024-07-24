import { supabase } from '../supabaseClient';
import { FormData } from '../_types/FormData';

// supabase CRUD Operations

// Motor

// getMotors, getMotorById HOOK

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

// addMotor HOOK

export const addMotor = async (newMotorData: FormData, files: File[]) => {
  try {
    const imageUrls = await uploadImages(files);

    const { data, error } = await supabase.from('motors').insert([
      {
        ...newMotorData,
        image_urls: imageUrls
      }
    ]);

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message || 'Unknown error');
    }

    console.log('Motor added successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in addMotor function', error);
    throw new Error('Error in addMotor function');
  }
};

// uploadImages HOOK

export const uploadImages = async (files: File[]): Promise<string[]> => {
  try {
    const uploadPromises = files.map((file) => {
      const filePath = `motors/${file.name}`;
      return supabase.storage
        .from('images')
        .upload(filePath, file)
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          if (data) {
            const { publicUrl } = supabase.storage.from('images').getPublicUrl(filePath).data;
            return publicUrl;
          }
          throw new Error('Upload failed');
        });
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw new Error('Error uploading images');
  }
};

// updateMotor HOOK

export const updateMotor = async (id: string, updates: any) => {
  const { data: motor, error } = await supabase.from('motors').update(updates).eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
  return motor;
};

// deleteMotor HOOK

export const deleteMotorProduct = async (id: string) => {
  const { error } = await supabase.from('motors').delete().eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
  return true; // Or handle as needed
};

// Cooler

// getCoolers, getCoolerById HOOK

export const getCoolers = async () => {
  const { data, error } = await supabase.from('coolers').select('*');

  console.log('Data:', data);
  console.log('Error:', error);

  if (error) throw new Error(error.message);
  return data;
};

export const getCoolerById = async (id: string) => {
  const { data, error } = await supabase.from('coolers').select('*').eq('id', id).single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// addCooler

export const addCooler = async (newCoolerData: FormData, files: File[]) => {
  try {
    const imageUrls = await uploadCoolerImages(files);

    const { data, error } = await supabase.from('coolers').insert([
      {
        ...newCoolerData,
        image_urls: imageUrls
      }
    ]);

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message || 'Unknown error');
    }

    console.log('Cooler added successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in addCooler function', error);
    throw new Error('Error in addCooler function');
  }
};

// uploadImages HOOK

export const uploadCoolerImages = async (files: File[]): Promise<string[]> => {
  try {
    const uploadPromises = files.map((file) => {
      const filePath = `coolers/${file.name}`;
      return supabase.storage
        .from('images')
        .upload(filePath, file)
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message);
          }
          if (data) {
            const { publicUrl } = supabase.storage.from('images').getPublicUrl(filePath).data;
            return publicUrl;
          }
          throw new Error('Upload failed');
        });
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  } catch (error) {
    console.error('Error uploading cooler images:', error);
    throw new Error('Error uploading cooler images');
  }
};

// Wishlist

export const addToWishlist = async (productId: string) => {
  const { data, error } = await supabase.from('wishlist').insert([{ product_id: productId }]);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const removeFromWishlist = async (productId: string) => {
  const { data, error } = await supabase.from('wishlist').delete().eq('product_id', productId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
