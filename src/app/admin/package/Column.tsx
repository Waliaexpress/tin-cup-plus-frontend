import React, { useState } from 'react';
import { TableColumn } from "@/components/Tables/data-table";
import Toggle from "@/components/common/Toggle";
import { Package } from "@/types/package";
import { Eye, Edit, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const PackageDetailsModal = dynamic(
  () => import('./components/PackageDetailsModal'),
  { ssr: false }
);

interface PackageStatusToggleProps {
  id: string;
  isActive: boolean;
  onStatusChange: (id: string, isActive: boolean) => Promise<boolean>;
}

const PackageStatusToggle: React.FC<PackageStatusToggleProps> = ({
  id,
  isActive,
  onStatusChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [localIsActive, setLocalIsActive] = useState(isActive);

  const handleToggle = async (checked: boolean) => {
    setIsLoading(true);
    try {
      const success = await onStatusChange(id, checked);
      if (success) {
        setLocalIsActive(checked);
      } else {
        setLocalIsActive(!checked);
      }
    } catch (error) {
      setLocalIsActive(!checked);
      console.error('Error toggling package status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2 justify-center">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${localIsActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
        {localIsActive ? 'Active' : 'Inactive'}
      </span>
      <Toggle
        checked={localIsActive}
        disabled={isLoading}
        onChange={handleToggle}
        className={isLoading ? 'opacity-50' : ''}
      />
    </div>
  );
};

export const usePackageColumns = (
  onStatusChange: (id: string, isActive: boolean) => Promise<boolean>
) => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handleViewDetails = (pkg: Package) => {
    setSelectedPackage(pkg);
  };

  const handleCloseModal = () => {
    setSelectedPackage(null);
  };

  const columns: TableColumn<Package>[] = [
    {
      header: "Name (English)",
      accessor: (item: Package) => (
        <span className="font-medium text-dark dark:text-white">
          {item.name?.en ? item.name.en.charAt(0).toUpperCase() + item.name.en.slice(1) : 'N/A'}
        </span>
      )
    },
    {
      header: "Name (Amharic)",
      accessor: (item: Package) => item.name?.am || 'N/A'
    },
    {
      header: "Price",
      accessor: (item: Package) => (
        <span className="font-medium">
          ${typeof item.basePrice === 'number' ? item.basePrice.toFixed(2) : 'N/A'}
        </span>
      )
    },
    {
      header: "Includes",
      accessor: (item: Package) => (
        <div className="space-y-1 text-sm">
          <div className="flex items-center">
            <span className="font-medium text-gray-600">Hall:</span>
            <span className="ml-2">{item.hall?.images?.length > 0 ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-600">Foods:</span>
            <span className="ml-2">{item.foods?.length || 0}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-600">Drinks:</span>
            <span className="ml-2">{item.drinks?.length || 0}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-600">Services:</span>
            <span className="ml-2">{item.services?.length || 0}</span>
          </div>
        </div>
      )
    },
    {
      header: "Status",
      accessor: (item: Package) => (
        <PackageStatusToggle
          id={item._id || ''}
          isActive={!!item.isActive}
          onStatusChange={onStatusChange}
        />
      )
    },
    {
      header: "Actions",
      accessor: (item: Package) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(item);
            }}
            className="p-1 text-gray-500 hover:text-primary transition-colors"
            title="View details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit package:', item._id);
            }}
            className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
            title="Edit package"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Are you sure you want to delete ${item.name?.en || 'this package'}?`)) {
                console.log('Delete package:', item._id);
              }
            }}
            className="p-1 text-gray-500 hover:text-red-600 transition-colors"
            title="Delete package"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return {
    columns,
    modal: selectedPackage && (
      <PackageDetailsModal
        packageData={selectedPackage}
        onClose={handleCloseModal}
      />
    ),
  };
};

export default usePackageColumns;
