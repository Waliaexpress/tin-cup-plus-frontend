"use client";

import { useState, useEffect, useRef } from "react";
import { X, Check, Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface Option {
  id: string;
  name: string | { en: string; am: string };
  color?: string;
}

interface TagMultiSelectProps {
  options: Option[];
  selectedValues: string[];
  onChange: (selectedIds: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  required?: boolean;
  error?: string;
  label?: string;
  language?: string;
  onListEndReached?: () => void;
}

export default function TagMultiSelect({
  options,
  selectedValues,
  onChange,
  placeholder = "Select items...",
  searchPlaceholder = "Search...",
  required = false,
  error,
  label,
  language = "en",
  onListEndReached
}: TagMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter((option) => {
    const optionName = typeof option.name === "string" 
      ? option.name 
      : option.name[language as keyof typeof option.name] || "";
    
    return optionName.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const toggleOption = (optionId: string) => {
    console.log('Toggling option:', optionId);
    console.log('Current selected values:', selectedValues);
    
    if (selectedValues.includes(optionId)) {
      // Remove this ID from the selection
      const newValues = selectedValues.filter(id => id !== optionId);
      console.log('New selected values (after removal):', newValues);
      onChange(newValues);
    } else {
      // Add this ID to the selection
      const newValues = [...selectedValues, optionId];
      console.log('New selected values (after addition):', newValues);
      onChange(newValues);
    }
  };

  const removeOption = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedValues.filter(id => id !== optionId));
  };

  const getOptionName = (option: Option): string => {
    return typeof option.name === "string" 
      ? option.name 
      : option.name[language as keyof typeof option.name] || "";
  };

  const selectedOptions = options.filter(option => 
    selectedValues.includes(option.id)
  );

  return (
    <div className="w-full">
      {label && (
        <div className="text-dark dark:text-white font-medium mb-2.5">
          {label} {required && <span className="text-red">*</span>}
        </div>
      )}
      
      <div className="relative" ref={dropdownRef}>
        <div
          className={`flex flex-wrap gap-2 min-h-[46px] w-full rounded border px-4 py-2 cursor-pointer ${
            isOpen 
              ? "border-primary" 
              : error 
                ? "border-red" 
                : "border-stroke dark:border-dark-3"
          } bg-white dark:bg-gray-dark`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOptions.length > 0 ? (
            selectedOptions.map(option => (
              <div
                key={option.id}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  option.color 
                    ? `bg-${option.color}-100 text-${option.color}-800` 
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                }`}
              >
                {getOptionName(option)}
                <button
                  type="button"
                  onClick={(e) => removeOption(option.id, e)}
                  className="p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))
          ) : (
            <div className="flex items-center text-body-color">
              {placeholder}
            </div>
          )}
        </div>
        
        {error && (
          <p className="mt-1 text-xs text-red">{error}</p>
        )}
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-stroke dark:border-dark-3 bg-white dark:bg-gray-dark shadow-lg">
            <div className="p-2 border-b border-stroke dark:border-dark-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-body-color" size={16} />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full rounded border border-stroke bg-white pl-10 pr-4 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
              </div>
            </div>
            
            <div 
              className="max-h-60 overflow-y-auto p-2"
              onScroll={(e) => {
                const target = e.target as HTMLDivElement;
                const isScrollAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 20;
                
                if (isScrollAtBottom && onListEndReached) {
                  onListEndReached();
                }
              }}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map(option => (
                  <div
                    key={option.id}
                    className={`flex items-center justify-between px-4 py-2 rounded cursor-pointer ${
                      selectedValues.includes(option.id)
                        ? "bg-primary/10"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => toggleOption(option.id)}
                  >
                    <span className="text-dark dark:text-white">
                      {getOptionName(option)}
                    </span>
                    {selectedValues.includes(option.id) && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-body-color text-center">
                  No results found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
