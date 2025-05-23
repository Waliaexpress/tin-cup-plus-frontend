export interface PackageImage {
    fileUrl: string;
    fileType: string;
    fileName: string;
    storageType: string;
    _id?: string;
  }
  
export interface MultiLanguageText {
    am?: string;
    en?: string;
  }
  
export interface PackageFood {
    _id: string;
    name: MultiLanguageText;
    description: MultiLanguageText;
    price: number;
    images: PackageImage[];
    [key: string]: any;
  }
  
export interface PackageService {
    _id: string;
    name: MultiLanguageText;
    description: MultiLanguageText;
  }
  