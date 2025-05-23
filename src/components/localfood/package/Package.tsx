import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useGetAllActivePackagesQuery } from '@/store/services/package.service';
import { PlusCircle, Users, DollarSign, PieChart, ArrowRight } from 'lucide-react';

interface PackageImage {
  fileUrl: string;
  fileType: string;
  fileName: string;
  storageType: string;
  _id?: string;
}

interface MultiLanguageText {
  am?: string;
  en?: string;
}

interface PackageFood {
  _id: string;
  name: MultiLanguageText;
  description: MultiLanguageText;
  price: number;
  images: PackageImage[];
  [key: string]: any;
}

interface PackageData {
  _id: string;
  name: MultiLanguageText;
  description: MultiLanguageText;
  banner: PackageImage;
  hall: {
    images: PackageImage[];
  };
  basePrice: number;
  minGuests: number;
  maxGuests: number;
  foods: PackageFood[];
  drinks: any[];
  services: any[];
  isActive: boolean;
  [key: string]: any;
}

const PackageSkeleton = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg overflow-hidden shadow-md h-[460px] relative animate-pulse"
    >
      <div className="bg-gray-300 h-52 w-full"></div>
      <div className="p-4 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="h-8 bg-gray-300 rounded-full w-8"></div>
        </div>
      </div>
    </motion.div>
  );
};

const PackageCard = ({ pkg }: { pkg: PackageData }) => {
  return (
    <Link title='View details' href={`/package/${pkg._id}`} >
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-lg overflow-hidden shadow-md h-[460px] relative flex flex-col"
    >
      <div className="relative h-52 w-full overflow-hidden">
        {pkg.banner?.fileUrl && (
          <Image 
            src={pkg.banner.fileUrl} 
            alt={pkg.name?.en || pkg.name?.am || 'Package Image'} 
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="transition-transform duration-500 hover:scale-110"
            priority
          />
        )}
        {pkg.foods.length > 0 && (
          <div className="absolute top-3 right-3 bg-primary text-white rounded-full py-1 px-3 text-xs font-semibold">
            {pkg.foods.length} {pkg.foods.length === 1 ? 'Food' : 'Foods'}
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold line-clamp-1 mb-2">
          {pkg.name?.en || pkg.name?.am || 'Unnamed Package'}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {pkg.description?.en || pkg.description?.am || 'No description available'}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {/* <div className="flex items-center text-sm text-gray-600">
            <DollarSign size={16} className="mr-1 text-primary" />
            <span>${pkg.basePrice}</span>
          </div> */}
          <div className="flex items-center text-sm text-gray-600">
            <Users size={16} className="mr-1 text-primary" />
            <span>{pkg.minGuests}-{pkg.maxGuests} guests</span>
          </div>
        </div>
        {/*isCustom */}
        {pkg.isCustom && (
          <div className="mt-4 inline-flex items-center justify-left hover:bg-primary/90 text-primary py-2  rounded-md transition-colors p-2 w-48 text-[12px]">
            <PlusCircle size={16} className="mr-1" />
            Custom Package 
          </div>
        )}

        <Link href={`/package/${pkg._id}`} className="mt-4 inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md transition-colors w-full">
          View Details <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </motion.div>
    </Link>
  );
};

const Package = () => {
  const { data, isLoading, isError, error } = useGetAllActivePackagesQuery({});
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => setIsLoadingMore(false), 1500);
  };

  const skeletonArray = Array.from({ length: 6 }, (_, i) => i);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="container mx-auto md:px-4 px-1 py-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Our Packages
      </h2>
      
      {isError && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
        >
          <p>Oops! We encountered an error while loading packages. Please try again later.</p>
        </motion.div>
      )}
      
      <AnimatePresence>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {isLoading ? (
            skeletonArray.map((index) => (
              <PackageSkeleton key={`skeleton-${index}`} />
            ))
          ) : data?.data && data.data.length > 0 ? (
            data.data.map((pkg: PackageData) => (
              <PackageCard key={pkg._id} pkg={pkg} />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12 text-gray-500"
            >
              <p className="text-xl">No packages available at the moment.</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      
      {data?.data && data.data.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 text-center"
        >
          {/* <button 
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="bg-primary hover:bg-primary/90 text-white py-2.5 px-6 rounded-full shadow-md transition-all duration-300 flex items-center justify-center mx-auto disabled:opacity-70"
          >
            {isLoadingMore ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              <span className="flex items-center">
                <PlusCircle className="mr-2" size={18} />
                Load More
              </span>
            )}
          </button> */}
        </motion.div>
      )}
    </div>
  );
};

export default Package;