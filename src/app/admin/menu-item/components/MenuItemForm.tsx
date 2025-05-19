"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MENU_ITEM_CONSTANTS } from "@/app/constants/menuItems";
import { useDebounce } from "@/hooks/useDebounce";
import { hasValidId, getItemId } from "@/utils/idHelpers";
import { useGetCategoriesQuery } from "@/store/services/category.service";
import { useGetDietaryTagsQuery } from "@/store/services/dietaryTag.service";
import { useGetIngridientsQuery } from "@/store/services/ingridient.service";
import { useCreateMenuItemMutation } from "@/store/services/menuItem.service";

import { MenuItemFormProps, FormValues, Ingredient, DietaryTag, Category } from "./types";
import BasicInfoSection from "./sections/BasicInfoSection";
import CategorizationSection from "./sections/CategorizationSection";
import DietaryIngredientsSection from "./sections/DietaryIngredientsSection";
import MediaSection from "./sections/MediaSection";
import AvailabilitySection from "./sections/AvailabilitySection";
import { AnyARecord } from "dns";


export default function MenuItemForm({ initialData, isEditing }: MenuItemFormProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(MENU_ITEM_CONSTANTS.SECTIONS.BASIC_INFO);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formModified, setFormModified] = useState(false);
  const [isTraditional, setIsTraditional] = useState(initialData?.is_traditional ?? false);
  
  const [categoryPage, setCategoryPage] = useState(1);
  const [dietaryTagPage, setDietaryTagPage] = useState(1);
  const [ingredientPage, setIngredientPage] = useState(1);
  
  const { data: categoriesResponse, isLoading: isLoadingCategories, error: categoriesError } = useGetCategoriesQuery({ 
    page: categoryPage, 
    limit: 20 
  }, { 
    skip: false,
    refetchOnMountOrArgChange: true
  });
  
  const { data: dietaryTagsResponse, isLoading: isLoadingDietaryTags, error: dietaryTagsError } = useGetDietaryTagsQuery({ 
    page: dietaryTagPage, 
    limit: 20 
  }, { 
    skip: false,
    refetchOnMountOrArgChange: true
  });
  
  const { data: ingredientsResponse, isLoading: isLoadingIngredients, error: ingredientsError } = useGetIngridientsQuery({ 
    page: ingredientPage, 
    limit: 20 
  }, { 
    skip: false,
    refetchOnMountOrArgChange: true
  });
  
  const [createMenuItem] = useCreateMenuItemMutation();
  
  const categoriesData = (categoriesResponse?.data?.categories || []) as Category[];
  const dietaryTagsData = (dietaryTagsResponse?.data?.dietaryTags || []) as DietaryTag[];
  const ingredientsData = (ingredientsResponse?.data?.ingredients || []) as Ingredient[];
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [dietaryTags, setDietaryTags] = useState<DietaryTag[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  
  useEffect(() => {
    try {
      if (categoriesData?.length) {
        setCategories(prev => {
          try {
            const newData = [...prev];
            categoriesData.forEach(item => {
              try {
                if (item && (item.id || item._id)) {
                  const itemId = getItemId(item);
                  if (!newData.some(existing => existing.id === itemId)) {
                    // @ts-ignore
                    const category: Category = {
                      id: itemId,
                      name: item.name || ''
                    };
                    newData.push(category);
                  }
                }
              } catch (error) {
                console.error('Error processing category item:', error);
              }
            });
            return newData;
          } catch (error) {
            console.error('Error updating categories state:', error);
            return prev;
          }
        });
      }
    } catch (error) {
      console.error('Error in categories effect:', error);
    }
  }, [categoriesData]);
  
  useEffect(() => {
    try {
      if (dietaryTagsData?.length) {
        setDietaryTags(prev => {
          try {
            const newData = [...prev];
            dietaryTagsData.forEach(item => {
              try {
                // @ts-ignore
                if (item && (item.id || item._id)) {
                  const itemId = getItemId(item);
                  if (!newData.some(existing => existing.id === itemId)) {
                  
                    const tag: DietaryTag = {
                      id: itemId,
                      name: item.name || ''
                    };
                    newData.push(tag);
                  }
                }
              } catch (error) {
                console.error('Error processing dietary tag item:', error);
              }
            });
            return newData;
          } catch (error) {
            console.error('Error updating dietary tags state:', error);
            return prev;
          }
        });
      }
    } catch (error) {
      console.error('Error in dietary tags effect:', error);
    }
  }, [dietaryTagsData]);
  
  useEffect(() => {
    try {
      if (ingredientsData?.length) {
        setIngredients(prev => {
          try {
            const newData = [...prev];
            ingredientsData.forEach(item => {
              try {
                // @ts-ignore
                if (item && (item.id || item._id)) {
                  const itemId = getItemId(item);
                  if (!newData.some(existing => existing.id === itemId)) {
                    const ingredient: Ingredient = {
                      id: itemId,
                      name: item.name || ''
                    };
                    newData.push(ingredient);
                  }
                }
              } catch (error) {
                console.error('Error processing ingredient item:', error);
              }
            });
            return newData;
          } catch (error) {
            console.error('Error updating ingredients state:', error);
            return prev;
          }
        });
      }
    } catch (error) {
      console.error('Error in ingredients effect:', error);
    }
  }, [ingredientsData]);
  

  const handleLoadMoreCategories = () => {
    console.log('Loading more categories...');
    setCategoryPage(prev => prev + 1);
  };
  
  const handleLoadMoreDietaryTags = () => {
    setDietaryTagPage(prev => prev + 1);
  };
  
  const handleLoadMoreIngredients = () => {
    setIngredientPage(prev => prev + 1);
  };
  
  // Create initial values for the form
  const defaultValues: FormValues = {
    name: {
      en: initialData?.name.en || "",
      am: initialData?.name.am || "",
    },
    description: {
      en: initialData?.description.en || "",
      am: initialData?.description.am || "",
    },
    price: initialData?.price || 0,
    categoryId: initialData?.category?.id || "",
    dietaryTagIds: initialData?.dietaryTags?.map(tag => tag.id) || [],
    // @ts-ignore
    ingredientIds: initialData?.ingredients?.map(ing => ing.id) || [],
    images: initialData?.images ? initialData.images.map(img => ({
      id: img.id || `existing-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      url: img.url || '',
      isMain: img.isMain || false
    })) : [],
    isActive: initialData?.isActive ?? true,
    isAvailable: initialData?.isAvailable ?? true,
    is_traditional: initialData?.is_traditional ?? false
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues,
    mode: "onChange"
  });

  useEffect(() => {
    setFormModified(isDirty);
  }, [isDirty]);

  const watchPrice = watch("price");
  

  const debouncedPrice = useDebounce(watchPrice, 500);
  

  useEffect(() => {
    if (debouncedPrice < MENU_ITEM_CONSTANTS.MIN_PRICE) {
      setValue("price", MENU_ITEM_CONSTANTS.MIN_PRICE);
    } else if (debouncedPrice > MENU_ITEM_CONSTANTS.MAX_PRICE) {
      setValue("price", MENU_ITEM_CONSTANTS.MAX_PRICE);
    }
  }, [debouncedPrice, setValue]);

  const onSubmit = async (data: FormValues) => {
    console.log("API DATA", data)
    setIsSubmitting(true);

    try {
      // Validation checks
      if (data.dietaryTagIds.length === 0) {
        toast.error("Please select at least one dietary tag.");
        setActiveSection(MENU_ITEM_CONSTANTS.SECTIONS.DIETARY_INGREDIENTS);
        setIsSubmitting(false);
        return;
      }

      if (data.ingredientIds.length === 0) {
        toast.error("Please select at least one ingredient.");
        setActiveSection(MENU_ITEM_CONSTANTS.SECTIONS.DIETARY_INGREDIENTS);
        setIsSubmitting(false);
        return;
      }

      if (data.images.length > 0) {
        const MAX_FILE_SIZE = MENU_ITEM_CONSTANTS.MAX_IMAGE_SIZE;
        const overSizedImages = data.images.filter(img =>
          img.file && img.file.size > MAX_FILE_SIZE
        );
        
        if (overSizedImages.length > 0) {
          toast.error(`Some images exceed the maximum size (${MAX_FILE_SIZE / (1024 * 1024)}MB). Please upload smaller images.`);
          setActiveSection(MENU_ITEM_CONSTANTS.SECTIONS.MEDIA);
          setIsSubmitting(false);
          return;
        }
      }

      const formData = new FormData();

      formData.append('name[en]', data.name.en.trim());
      formData.append('name[am]', data.name.am.trim());
      formData.append('description[en]', data.description.en.trim());
      formData.append('description[am]', data.description.am.trim());
      formData.append('price', data.price.toString());
      formData.append('category', data.categoryId);
      formData.append('isTraditional', isTraditional.toString());

      if (data.dietaryTagIds && data.dietaryTagIds.length > 0) {
        const filteredTags = data.dietaryTagIds.filter(id => id); 
       
        
       
       
          formData.append('dietaryTag', JSON.stringify(filteredTags));

       
      }
      
      if (data.ingredientIds && data.ingredientIds.length > 0) {
        const filteredIngredients = data.ingredientIds.filter(id => id); 
        
       
        formData.append('ingredients', JSON.stringify(filteredIngredients));
      }

      if (data.images && data.images.length > 0) {
        
        let validFilesFound = false;
        let mainImageIndex = -1;
        
      
        data.images.forEach((image, index) => {
          if (image.isMain) {
            mainImageIndex = index;
          }
        });
        
        if (mainImageIndex === -1 && data.images.length > 0) {
          mainImageIndex = 0;
        }
        
        // if (mainImageIndex !== -1) {
        //   formData.append('mainImageIndex', mainImageIndex.toString());
        // }
        
       
        data.images.forEach((image, index) => {
          if (image.file && image.file.size > 0) {
            try {
            
              if (image.file instanceof File) {
              
                if (image.file.size > 0) {
                  formData.append('images', image.file);
                  validFilesFound = true;
                  
        
                  // if (index === mainImageIndex) {
                  //   formData.append('mainImage', 'true');
                  // }
                }
              } else {
                console.log('Not a valid File object:', image.file);
              }
            } catch (error) {
              console.error('Error processing image file:', error);
            }
          }
          else if (image.preview || image.url) {
            console.log(`Image with URL: ${image.preview || image.url}`);
            if (image.id && !image.id.startsWith('new-')) {
              formData.append('existingImages', image.id);
            }
          }
        });
        
        console.log('Images added to form data:', validFilesFound);
        
     
        for (const pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
      } else {
        console.log('No images to upload');
      }

      // formData.append('isActive', data.isActive.toString());
      // formData.append('isAvailable', data.isAvailable.toString());


      const response = await createMenuItem(formData).unwrap();

      toast.success(`Menu item ${isEditing ? 'updated' : 'created'} successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      router.refresh();
      router.push('/admin/menu-item');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again.', {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (formModified) {
      if (confirm("You have unsaved changes. Are you sure you want to leave?")) {
        router.back();
      }
    } else {
      router.back();
    }
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <ToastContainer />
      
      
      {(categoriesError || dietaryTagsError || ingredientsError) && (
        <div className="mb-4 p-4 bg-red-100 rounded">
          <p className="font-medium text-red-700">API Error(s):</p>
          <ul className="list-disc pl-5 mt-2 text-red-700">
            {categoriesError && <li>Categories: {JSON.stringify(categoriesError)}</li>}
            {dietaryTagsError && <li>Dietary Tags: {JSON.stringify(dietaryTagsError)}</li>}
            {ingredientsError && <li>Ingredients: {JSON.stringify(ingredientsError)}</li>}
          </ul>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8 flex flex-wrap gap-3 border-b border-stroke pb-5">
          <button
            type="button"
            className={`px-4 py-2 rounded-t-lg ${
              activeSection === MENU_ITEM_CONSTANTS.SECTIONS.BASIC_INFO
                ? "bg-primary text-white"
                : "bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveSection(MENU_ITEM_CONSTANTS.SECTIONS.BASIC_INFO)}
          >
            Basic Information
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-t-lg ${
              activeSection === MENU_ITEM_CONSTANTS.SECTIONS.CATEGORIZATION
                ? "bg-primary text-white"
                : "bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveSection(MENU_ITEM_CONSTANTS.SECTIONS.CATEGORIZATION)}
          >
            Categorization
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-t-lg ${
              activeSection === MENU_ITEM_CONSTANTS.SECTIONS.DIETARY_INGREDIENTS
                ? "bg-primary text-white"
                : "bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveSection(MENU_ITEM_CONSTANTS.SECTIONS.DIETARY_INGREDIENTS)}
          >
            Dietary & Ingredients
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-t-lg ${
              activeSection === MENU_ITEM_CONSTANTS.SECTIONS.MEDIA
                ? "bg-primary text-white"
                : "bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveSection(MENU_ITEM_CONSTANTS.SECTIONS.MEDIA)}
          >
            Media
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-t-lg ${
              activeSection === MENU_ITEM_CONSTANTS.SECTIONS.AVAILABILITY
                ? "bg-primary text-white"
                : "bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveSection(MENU_ITEM_CONSTANTS.SECTIONS.AVAILABILITY)}
          >
            Availability
          </button>
        </div>

        {activeSection === MENU_ITEM_CONSTANTS.SECTIONS.BASIC_INFO && (
          <BasicInfoSection 
            control={control} 
            register={register} 
            errors={errors} 
            watch={watch} 
          />
        )}

        {activeSection === MENU_ITEM_CONSTANTS.SECTIONS.CATEGORIZATION && (
          <CategorizationSection 
            control={control} 
            errors={errors} 
            categories={categoriesData}
            onLoadMore={handleLoadMoreCategories}
            setIsTraditional={setIsTraditional}
            isTraditional={isTraditional}
          />
        )}

        {activeSection === MENU_ITEM_CONSTANTS.SECTIONS.DIETARY_INGREDIENTS && (
          <DietaryIngredientsSection 
            control={control} 
            errors={errors} 
            dietaryTags={dietaryTagsData} 
            ingredients={ingredientsData}
            onLoadMoreDietaryTags={handleLoadMoreDietaryTags}
            onLoadMoreIngredients={handleLoadMoreIngredients}
          />
        )}

        {activeSection === MENU_ITEM_CONSTANTS.SECTIONS.MEDIA && (
          <MediaSection 
            control={control} 
            errors={errors} 
          />
        )}

        {activeSection === MENU_ITEM_CONSTANTS.SECTIONS.AVAILABILITY && (
          <AvailabilitySection 
            register={register} 
          />
        )}

        {/* Form Actions */}
        <div className="mt-10 flex justify-end gap-4">
          <Button 
            label="Cancel"
            onClick={handleCancel}
            variant="outlinePrimary"
            className="border-stroke bg-white hover:border-primary hover:bg-white dark:border-dark-3 dark:bg-gray-dark dark:hover:border-primary dark:hover:bg-gray-dark"
          />
          <Button 
            label={isSubmitting ? 'Saving...' : isEditing ? 'Update Menu Item' : 'Create Menu Item'}
            variant="primary"
            className={`hover:bg-primary-dark ${(isSubmitting || (!isDirty && isEditing)) ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={!isSubmitting && (isDirty || !isEditing) ? handleSubmit(onSubmit) : undefined}
          />
        </div>
      </form>
    </div>
  );
}
