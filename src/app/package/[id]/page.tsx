"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useGetPublicPackageByIdQuery } from '@/store/services/package.service';
import { Users, DollarSign, Calendar, Clock, X } from 'lucide-react';
import Footer from '@/components/Landingpage/Footer';
import MainNavigation from '@/components/layout/navigation/MainNavigation';
import DetailsSkeleton from '@/components/localfood/package/DetailsSkeleton';
import ServiceItem from '@/components/localfood/package/ServiceItem';
import { PackageFood, PackageImage, PackageService } from '@/types/packages';
import FoodCard from '@/components/localfood/package/FoodCard';

const PackageDetails = () => {
  const params = useParams();
  const packageId = params.id as string;

  const { data, isLoading, isError, error } = useGetPublicPackageByIdQuery(packageId);
  const packageData = data?.data;

  const hasHallImages = packageData?.hall?.images && packageData.hall.images.length > 0;

  if (isLoading) return <DetailsSkeleton />;

  if (isError || !packageData) {
    return (
      <>
        <MainNavigation />
        <div className="container mx-auto md:px-4 px-1 py-16 min-h-[50vh] flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 p-8 rounded-lg text-center max-w-lg mx-auto"
          >
            <div className="mx-auto bg-red-100 w-16 h-16 mb-4 rounded-full flex items-center justify-center">
              <X size={24} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Package Not Found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find the package you're looking for. It may have been removed or the ID is incorrect.
            </p>
            <Link
              href="/ethiopian-dishes"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-md transition-colors"
            >
              Browse Packages
            </Link>
          </motion.div>
        </div>
        <Footer isTraditional={true} />
      </>
    );
  }

  return (
    <>
      <MainNavigation />
      <div className="container mx-auto md:px-4 px-1 py-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/ethiopian-dishes"
            className="inline-flex items-center text-primary hover:underline mb-6"
          >
            &larr; Back to Packages
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
            {packageData.name?.en || packageData.name?.am || 'Package Details'}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="relative h-[400px] w-full mb-6 rounded-lg overflow-hidden shadow-md">
              {packageData.banner?.fileUrl ? (
                <Image
                  src={packageData.banner.fileUrl}
                  alt={packageData.name?.en || packageData.name?.am || 'Package banner'}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                  className="transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400">No banner image available</span>
                </div>
              )}
            </div>

            <h2 className="text-2xl font-semibold mb-3">About this Package</h2>
            <p className="text-gray-700 mb-6">
              {packageData.description?.en || packageData.description?.am || 'No description available for this package.'}
            </p>

            {packageData?.foods && packageData?.foods?.length > 0 && (
              <div className="my-8">
                <h2 className="text-2xl font-semibold mb-6">Included Foods</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {packageData?.foods?.map((food: PackageFood) => (
                      <FoodCard key={food._id} food={food} />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {hasHallImages && (
              <div className="my-8">
                <h2 className="text-2xl font-semibold mb-6">Hall Images</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {packageData?.hall?.images?.map((image: PackageImage, index: number) => (
                    <motion.div
                      key={image._id || index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="relative h-64 rounded-lg overflow-hidden shadow-md"
                    >
                      <Image
                        src={image.fileUrl}
                        alt={`Hall image ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="transition-transform duration-500 hover:scale-110"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-2xl font-semibold mb-6">Package Details</h2>

              <div className="space-y-4">
                {/* <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <DollarSign size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Base Price</p>
                    <p className="font-semibold">${packageData?.basePrice}</p>
                  </div>
                </div> */}

                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Users size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Guest Capacity</p>
                    <p className="font-semibold">{packageData?.minGuests} - {packageData?.maxGuests} people</p>
                  </div>
                </div>

                {packageData?.perPerson && (
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <Calendar size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pricing Type</p>
                      <p className="font-semibold">Per Person</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Clock size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created On</p>
                    <p className="font-semibold">
                      {new Date(packageData?.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {packageData?.services && packageData?.services?.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">Included Services</h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <AnimatePresence>
                      {packageData?.services?.map((service: PackageService) => (
                        <ServiceItem key={service?._id} service={service} />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              <div className="mt-8">
                <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center">
                  Book This Package
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer isTraditional={true} />
    </>
  );
};

export default PackageDetails;
