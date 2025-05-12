
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CategoryForm from "@/components/categories/CategoryForm";

export default function CreateCategoryPage() {

  
  return (
    <>
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-dark dark:text-white">
            Create New Category
          </h2>
          <p className="text-sm text-body-color dark:text-dark-6">
            Add a new category to organize menu items
          </p>
        </div>

        <CategoryForm isEditing={false}  />
      </div>
    </>
  );
}
