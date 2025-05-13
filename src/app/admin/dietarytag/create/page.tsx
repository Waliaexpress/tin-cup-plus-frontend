"use client";

import DietaryTagForm from "@/components/dietary-tags/DietaryTagForm";

export default function CreateDietaryTag() {
  return (
    <div className="mx-auto px-4 md:px-8 2xl:px-0">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-dark dark:text-white">
          Create Dietary Tag
        </h2>
        <p className="text-body-color dark:text-dark-6">
          Add a new dietary tag to the system
        </p>
      </div>

      <DietaryTagForm isEditing={false} />
    </div>
  );
}
