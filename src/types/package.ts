export interface MultiLanguageField {
  en: string;
  am: string;
}

export interface PackageHall {
  capacity: number;
  images: string[];
}

export interface PackageFood {
  id: string;
  name: MultiLanguageField;
  price: number;
}

export interface PackageDrink {
  id: string;
  name: MultiLanguageField;
  price: number;
}

export interface PackageService {
  name: MultiLanguageField;
  description?: MultiLanguageField;
}

export interface Package {
  _id?: string;
  name: MultiLanguageField;
  description?: MultiLanguageField;
  basePrice: number;
  minGuests?: number;
  maxGuests?: number;
  bannerImage: string;
  hall?: PackageHall;
  foods: PackageFood[];
  drinks: PackageDrink[];
  services: PackageService[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePackageFormData {
  name: MultiLanguageField;
  description: MultiLanguageField;
  basePrice: number;
  minGuests: number | null;
  maxGuests: number | null;
  bannerImage: File | null;
  includesHall: boolean;
  hall: {
    capacity: number | null;
    images: File[];
  };
  foods: string[];
  drinks: string[];
  services: PackageService[];
  isActive: boolean;
  forCatering: boolean;
  active?: boolean
}

export type PackageStepType = 
  | 'base'
  | 'hall'
  | 'food'
  | 'services'
  | 'preview';

export interface PackageFormState {
  currentStep: PackageStepType;
  formData: CreatePackageFormData;
  completedSteps: PackageStepType[];
}
