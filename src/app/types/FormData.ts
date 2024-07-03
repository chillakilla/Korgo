export interface MotorFormData {
  name: string;
  description: string;
  category: string;
  company_name: string;
  tech_spec: string;
  images: FileList | null; // for file upload
}
