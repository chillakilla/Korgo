import { supabase } from '../supabaseClient';
import { FormData } from '../types/FormData';

// supabase CRUD Operations

//get

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

//addMotor hook

export const addMotor = async (newMotorData: FormData) => {
  try {
    const { data, error } = await supabase.from('motors').insert([
      {
        name: newMotorData.name,
        category: newMotorData.category,
        company_name: newMotorData.company_name,
        description: newMotorData.description,
        tech_spec: newMotorData.tech_spec,
        model_number: newMotorData.model_number
      }
    ]);

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message || 'Unknown error');
    }

    console.log('Motor added successfully supabase API file console.log', data);
    return data;
  } catch (error) {
    console.error('Error in addMotor function', error);
    throw new Error('Error in addMotor function');
  }
};

// uploadImages hook

export const uploadImages = async (files: File[]): Promise<string[]> => {
  try {
    const uploadPromises = files.map((file) => supabase.storage.from('images').upload(`motors/${file.name}`, file));

    const results = await Promise.all(uploadPromises);

    const imageUrls: string[] = [];
    results.forEach(({ data, error }, index) => {
      if (error) {
        console.error(`Error uploading image ${files[index].name}:`, error);
        throw new Error(error.message);
      }
      if (data) {
        imageUrls.push(data.path);
      }
    });

    return imageUrls;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw new Error('Error uploading images');
  }
};

// updateMotor hook

export const updateMotor = async (id: string, updates: any) => {
  const { data: motor, error } = await supabase.from('motors').update(updates).eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
  return motor;
};

export const deleteMotorProduct = async (id: string) => {
  const { error } = await supabase.from('motors').delete().eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
  return true; // Or handle as needed
};

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
