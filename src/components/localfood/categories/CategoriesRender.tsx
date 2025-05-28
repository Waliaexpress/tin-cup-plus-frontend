import React from 'react'

interface CategoriesRenderProps {
    categoriesResponse: any;
    activeCategory: string;
    handleCategoryChange: (categoryId: string) => void;
}

const CategoriesRender = ({categoriesResponse, activeCategory, handleCategoryChange}: CategoriesRenderProps) => {
  return (
     <section className="py-8 bg-white border-b">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-4">
                {categoriesResponse?.data?.map((category: any) => (
                  <button
                    key={category._id}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category._id
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => handleCategoryChange(category._id)}
                  >
                    {category?.name?.en}
                  </button>
                ))}
              </div>
            </div>
          </section>
  )
}
export default CategoriesRender