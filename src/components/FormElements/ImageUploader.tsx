"use client";

import { useState, useCallback, useRef } from "react";
import { X, Upload, Image as ImageIcon, Check } from "lucide-react";
import { MENU_ITEM_CONSTANTS } from "@/app/constants/menuItems";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  isMain: boolean;
  isUploading?: boolean;
  progress?: number;
}

interface ImageUploaderProps {
  initialImages?: {
    id: string;
    url: string;
    isMain: boolean;
  }[];
  onChange: (images: ImageFile[]) => void;
  maxImages?: number;
}

export default function ImageUploader({
  initialImages = [],
  onChange,
  maxImages = MENU_ITEM_CONSTANTS.MAX_IMAGES,
}: ImageUploaderProps) {
  const [images, setImages] = useState<ImageFile[]>(() => {
    console.log('Initial images:', initialImages);
    return initialImages.map((img) => {
      // Create a real file from the URL if possible, otherwise use a placeholder
      let file: File;
      try {
        // Create a non-empty file to ensure it's detected in form submission
        // This is a workaround since we can't create a real file from a URL directly
        const blob = new Blob(['image-content-placeholder'], { type: 'application/octet-stream' });
        file = new File([blob], img.url?.split('/')?.pop() || 'image.jpg', { type: 'image/jpeg' });
      } catch (error) {
        console.error('Error creating file from image:', error);
        file = new File(['placeholder-content'], "placeholder.jpg", { type: 'image/jpeg' });
      }

      return {
        id: img.id || `existing-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        file: file,
        preview: img.url,
        isMain: img.isMain || false,
        isUploading: false,
        progress: 100,
      };
    });
  });
  
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!MENU_ITEM_CONSTANTS.ALLOWED_IMAGE_TYPES.includes(file.type)) {
      alert(`File type not supported. Please upload JPEG, PNG, or WebP images.`);
      return false;
    }
    
    // Check file size
    if (file.size > MENU_ITEM_CONSTANTS.MAX_IMAGE_SIZE) {
      alert(`File is too large. Maximum size is ${MENU_ITEM_CONSTANTS.MAX_IMAGE_SIZE / (1024 * 1024)}MB.`);
      return false;
    }
    
    return true;
  };

  const processFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    
    // Check if adding these files would exceed the maximum
    if (images.length + files.length > maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }
    
    const newImages: ImageFile[] = [];
    
    Array.from(files).forEach((file) => {
      if (!validateFile(file)) return;
      
      // Create a unique ID for this file
      const id = `new-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const isMain = images.length === 0 && newImages.length === 0;
      
      // Store the actual file object (critical for form submission)
      const imageFile = {
        id,
        file, // This is the actual File object that needs to be sent to the API
        preview: URL.createObjectURL(file),
        isMain,
        isUploading: true,
        progress: 0,
      };
      
      // Add detailed logging
      console.log('Created new image file object:', {
        id: imageFile.id,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        preview: imageFile.preview
      });
      
      newImages.push(imageFile);
    });
    
    // Update both local state and parent form
    const updatedImages = [...images, ...newImages];
    
    // Log what files are being sent to the form
    console.log('Adding new images to form:', newImages.map(img => ({
      id: img.id,
      fileName: img.file.name,
      fileSize: img.file.size,
      fileType: img.file.type
    })));
    
    setImages(updatedImages);
    
    // Ensure the form gets the full file objects
    onChange(updatedImages);
    
    // Simulate upload progress for each new image
    newImages.forEach((img) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress > 100) {
          clearInterval(interval);
          // Update local state
          setImages((prev) => {
            const updated = prev.map((i) => 
              i.id === img.id ? { ...i, isUploading: false, progress: 100 } : i
            );
            // Critical: Call onChange with the updated array to sync with parent form
            setTimeout(() => onChange(updated), 0);
            return updated;
          });
        } else {
          setImages((prev) => {
            const updated = prev.map((i) => 
              i.id === img.id ? { ...i, progress } : i
            );
            return updated;
          });
        }
      }, 200);
    });
  }, [images, maxImages, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    // Reset the input value so the same file can be selected again if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [processFiles]);

  const handleRemoveImage = useCallback((id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      
      // If we removed the main image, set the first remaining image as main
      if (prev.find((img) => img.id === id)?.isMain && filtered.length > 0) {
        filtered[0].isMain = true;
      }
      
      onChange(filtered);
      return filtered;
    });
  }, [onChange]);

  const handleSetMainImage = useCallback((id: string) => {
    setImages((prev) => {
      const updated = prev.map((img) => ({
        ...img,
        isMain: img.id === id,
      }));
      
      onChange(updated);
      return updated;
    });
  }, [onChange]);

  const handleBrowseClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  return (
    <div className="w-full">
      <div
        className={`relative flex flex-col items-center justify-center w-full min-h-[200px] border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-stroke dark:border-dark-3"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="w-12 h-12 mb-3 text-body-color" />
          <p className="mb-2 text-sm text-dark dark:text-white">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-body-color">
            JPEG, PNG or WebP (MAX. {MENU_ITEM_CONSTANTS.MAX_IMAGE_SIZE / (1024 * 1024)}MB)
          </p>
          <button
            type="button"
            onClick={handleBrowseClick}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Browse Files
          </button>
        </div>
      </div>

      {images.length > 0 && (
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative group rounded-lg overflow-hidden border ${
                img.isMain
                  ? "border-primary"
                  : "border-stroke dark:border-dark-3"
              }`}
            >
              <div className="relative aspect-square">
                <img
                  src={img.preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                
                {img.isUploading && (
                  <div className="absolute inset-0 bg-dark/50 flex items-center justify-center">
                    <div className="w-full max-w-[80%]">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-primary rounded-full"
                          style={{ width: `${img.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-white text-xs mt-1 text-center">
                        {img.progress}%
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="absolute top-2 right-2 flex space-x-1">
                  {!img.isMain && !img.isUploading && (
                    <button
                      type="button"
                      onClick={() => handleSetMainImage(img.id)}
                      className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                      title="Set as main image"
                    >
                      <ImageIcon className="w-4 h-4 text-dark" />
                    </button>
                  )}
                  
                  {img.isMain && (
                    <div
                      className="p-1 bg-primary rounded-full shadow-md"
                      title="Main image"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  {!img.isUploading && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(img.id)}
                      className="p-1 bg-white rounded-full shadow-md hover:bg-red-100 transition-colors"
                      title="Remove image"
                    >
                      <X className="w-4 h-4 text-red" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-2 text-xs truncate">
                {img.file.name !== "placeholder"
                  ? img.file.name
                  : img.preview?.split("/")?.pop() || "Image"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
