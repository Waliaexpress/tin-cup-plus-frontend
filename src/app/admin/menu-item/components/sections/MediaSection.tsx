"use client";

import { Control, Controller, FieldErrors } from "react-hook-form";
import ImageUploader from "@/components/FormElements/ImageUploader";
import { MENU_ITEM_CONSTANTS } from "@/app/constants/menuItems";
import { FormValues } from "../types";

interface MediaSectionProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
}

export default function MediaSection({ control, errors }: MediaSectionProps) {
  return (
    <div className="mb-6">
      <div className="text-dark dark:text-white font-medium mb-2.5">
        Images (Optional)
      </div>
      <p className="mb-4 text-sm text-body-color">
        Upload up to {MENU_ITEM_CONSTANTS.MAX_IMAGES} images. The first image or the one marked as main will be used as the primary image.
      </p>
      
      <Controller
        name="images"
        control={control}
        // Images are now optional
        rules={{}}
        render={({ field }) => {
          console.log('Current images in form:', field.value);
          return (
            <ImageUploader
              initialImages={field.value || []}
              onChange={(images) => {
                console.log('Images changed, new value:', images);
                // Ensure we're passing the full image objects with file information
                field.onChange(images);
              }}
              maxImages={MENU_ITEM_CONSTANTS.MAX_IMAGES}
            />
          );
        }}
      />
      
      {errors.images && (
        <p className="mt-2 text-xs text-red">
          {errors.images.message as string}
        </p>
      )}
    </div>
  );
}
