"use client";

import MenuItemForm from "../components/MenuItemForm";

export default function CreateMenuItemPage() {
  return (
    <div className="mx-auto px-4 md:px-8 2xl:px-0">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-dark dark:text-white">
          Create New Menu Item
        </h2>
        <p className="text-body-color dark:text-dark-6">
          Fill in the details to create a new menu item
        </p>
      </div>
      
      <MenuItemForm isEditing={false} />
    </div>
  );
}
