import { X } from 'lucide-react';
import Image from 'next/image';
import { Package } from '@/types/package';

interface PackageDetailsModalProps {
  packageData: any;
  onClose: () => void;
}

export default function PackageDetailsModal({ packageData, onClose }: PackageDetailsModalProps) {
  if (!packageData) return null;

  return (
    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {packageData.name?.en || 'Package Details'}
            </h2>
            <p className="text-gray-600">{packageData.description?.en || 'No description available'}</p>
          </div>

          {packageData.banner?.fileUrl && (
            <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src={packageData.banner.fileUrl}
                alt={packageData.name?.en || 'Package Banner'}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3">Pricing & Capacity</h3>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-600">Base Price:</span>
                  <span className="font-medium">${packageData.basePrice?.toFixed(2) || '0.00'}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Min Guests:</span>
                  <span>{packageData.minGuests || 'N/A'}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Max Guests:</span>
                  <span>{packageData.maxGuests || 'N/A'}</span>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3">Includes</h3>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-600">Hall:</span>
                  <span>{packageData.hall?.images?.length > 0 ? 'Yes' : 'No'}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Foods:</span>
                  <span>{packageData.foods?.length || 0} items</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Drinks:</span>
                  <span>{packageData.drinks?.length || 0} items</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Services:</span>
                  <span>{packageData.services?.length || 0} items</span>
                </p>
              </div>
            </div>
          </div>

          {packageData.foods && packageData.foods.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Food Items</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {packageData.foods.map((food: any, index: number) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{food.name?.en || 'Unnamed Food'}</h4>
                        <p className="text-sm text-gray-600">${food.price?.toFixed(2) || '0.00'}</p>
                      </div>
                      {food?.images?.[0]?.fileUrl && (
                        <div className="relative w-16 h-16 ml-4">
                          <Image
                            src={food?.images?.[0]?.fileUrl}
                            alt={food.name?.en || 'Food item'}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {packageData.services && packageData.services.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {packageData?.services?.map((service, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <h4 className="font-medium">{service?.name?.en || 'Unnamed Service'}</h4>
                    {service?.description?.en && (
                      <p className="text-sm text-gray-600 mt-1">{service?.description?.en}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
           <button
          onClick={onClose}
          className=" p-1 rounded-full hover:bg-gray-100 float-end flex items-center gap-3 mb-3 "
        >
          
          <X className="w-6 h-6 text-gray-500" />
        <p>  Close</p>
        </button>
        </div>
      </div>
    </div>
  );
}
