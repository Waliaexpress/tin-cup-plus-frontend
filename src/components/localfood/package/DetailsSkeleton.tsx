import React from 'react'

const DetailsSkeleton = () => {
    return (
      <div className="container mx-auto md:px-4 py-8 animate-pulse">
        <div className="bg-gray-300 h-12 w-3/4 mb-8 rounded"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-gray-300 h-96 w-full rounded-lg mb-6"></div>
            <div className="bg-gray-300 h-6 w-2/3 rounded mb-4"></div>
            <div className="bg-gray-300 h-4 w-full rounded mb-3"></div>
            <div className="bg-gray-300 h-4 w-5/6 rounded mb-3"></div>
            
            <div className="my-8">
              <div className="bg-gray-300 h-8 w-1/3 rounded mb-4"></div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-300 h-40 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md h-fit">
            <div className="bg-gray-300 h-8 w-2/3 rounded mb-6"></div>
            
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center mb-4">
                <div className="bg-gray-300 h-8 w-8 rounded-full mr-3"></div>
                <div className="bg-gray-300 h-5 w-2/3 rounded"></div>
              </div>
            ))}
            
            <div className="mt-8">
              <div className="bg-gray-300 h-12 w-full rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default DetailsSkeleton;