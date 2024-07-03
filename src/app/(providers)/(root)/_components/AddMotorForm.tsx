'use client';

import React, { useState } from 'react';
import { FormData } from '@/app/types/FormData';

interface AddMotorFormProps {
  onSubmit: (formData: FormData) => void;
}

const AddMotorForm: React.FC<AddMotorFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    company_name: '',
    description: '',
    tech_spec: '',
    model_number: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      category: '',
      company_name: '',
      description: '',
      tech_spec: '',
      model_number: ''
    });
  };

  return (
    <div className="container mx-auto mt-8 mb-8">
      <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div>
            <label htmlFor="name" className="block text-m font-bold text-gray-700 ">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field border-1 p-1"
              style={{ width: '100%' }}
              placeholder="Enter motor name"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-m font-bold text-gray-700 ">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field border-1 p-1"
              style={{ width: '100%' }}
              placeholder="Enter category"
              required
            />
          </div>

          <div>
            <label htmlFor="company_name" className="block text-m font-bold text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="input-field border-1 p-1"
              style={{ width: '100%' }}
              placeholder="Enter company name"
              required
            />
          </div>

          <div>
            <label htmlFor="model_number" className="block text-m font-bold text-gray-700">
              Model Number
            </label>
            <input
              type="text"
              id="model_number"
              name="model_number"
              value={formData.model_number}
              onChange={handleChange}
              className="input-field border-1 p-1"
              placeholder="Enter model number"
              style={{ width: '100%' }}
              required
            />
          </div>

          <div>
            <label htmlFor="tech_spec" className="block text-m font-bold text-gray-700">
              Technical Specifications
            </label>
            <textarea
              id="tech_spec"
              name="tech_spec"
              value={formData.tech_spec}
              onChange={handleChange}
              className="input-field resize-none border-1 p-1"
              placeholder="Enter technical specifications"
              style={{ width: '100%', height: '80px' }}
              rows={4}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-m font-bold text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-field resize-none border-1 p-1"
              placeholder="Enter description"
              style={{ width: '100%', height: '80px' }}
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className="btn bg-main-color text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMotorForm;
