"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetPublicDietaryTagsQuery } from "@/store/services/dietaryTag.service";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DietaryTags = () => {
  const searchParams = useSearchParams();
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  
  const { data: dietaryTagsResponse, isLoading } = useGetPublicDietaryTagsQuery({ 
    page, 
    limit: 15,
    isActive: true 
  });
  
  const dietaryTags = dietaryTagsResponse?.data?.dietaryTags || [];
  const pagination = dietaryTagsResponse?.data 
    ? { 
        total: dietaryTagsResponse.data.total,
        currentPage: dietaryTagsResponse.data.page,
        lastPage: dietaryTagsResponse.data.lastPage,
        limit: dietaryTagsResponse.data.limit
      } 
    : null;

  useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      setSelectedTagId(tagParam);
    }
  }, [searchParams]);

  const handleTagClick = (tagId: string) => {
    const newSelectedId = selectedTagId === tagId ? null : tagId;
    setSelectedTagId(newSelectedId);
    const params = new URLSearchParams(searchParams.toString());
    
    if (newSelectedId) {
      params.set('tag', newSelectedId);
    } else {
      params.delete('tag');
    }
    
    const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : '');
    window.history.pushState({}, '', newUrl);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && (!pagination || newPage <= pagination.lastPage)) {
      setPage(newPage);
    }
  };

  const getContrastTextColor = (hexColor: string) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  };

  if (isLoading && dietaryTags.length === 0) {
    return (
      <section className="pb-6 pt-3 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-lg font-medium mb-4">Dietary Preferences</h3>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className="h-8 w-20 rounded-full bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (dietaryTags.length === 0) {
    return null;
  }

  return (
    <section className="pb-6 pt-3 bg-white">
      <div className="container mx-auto px-4">   
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {dietaryTags.map((tag: any) => {
            const isSelected = selectedTagId === tag._id;
            
            return (
              <button
                key={tag._id}
                onClick={() => handleTagClick(tag._id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  isSelected 
                    ? 'ring-2 ring-offset-1' 
                    : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: tag.colorCode || '#E5E7EB',
                  color: getContrastTextColor(tag.colorCode || '#E5E7EB'),
                  boxShadow: isSelected ? '0 1px 3px rgba(0,0,0,0.12)' : 'none'
                }}
                title={tag.description.en}
              >
                {tag.name.en}
              </button>
            );
          })}
        </div>
        
        {pagination && pagination.lastPage > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className={`flex items-center p-1 rounded-full ${
                page <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            
            {[...Array(pagination.lastPage)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-8 h-8 rounded-full text-sm flex items-center justify-center ${
                  page === i + 1
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= pagination.lastPage}
              className={`flex items-center p-1 rounded-full ${
                page >= pagination.lastPage ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DietaryTags;
