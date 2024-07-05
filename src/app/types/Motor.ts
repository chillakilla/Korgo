export interface Motor {
  id: string; // uuid
  name: string;
  description: string;
  created_at: string; // timestamp
  category: string;
  company_name: string;
  tech_spec: string;
  image_urls: string[]; // array of image URLs
}
