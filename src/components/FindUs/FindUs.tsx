import React from 'react'
import { motion } from 'framer-motion'
import GoogleMapRender from '../GoogleMap/GoogleMapRender'

const RESTAURANT_LOCATION = {
  latitude: 40.7128,  
  longitude: -74.0060,
  address: "123 Restaurant Avenue, New York, NY 10001"
};

const FindUs = () => {
  return (
    <motion.section 
        className="py-16 px-4 bg-gray-50"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-2">Find Us</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Visit our restaurant at {RESTAURANT_LOCATION.address} or check the map below.</p>
          </motion.div>
          
          <motion.div
            className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <GoogleMapRender 
              latitude={RESTAURANT_LOCATION.latitude} 
              longitude={RESTAURANT_LOCATION.longitude} 
              address={RESTAURANT_LOCATION.address} 
            />
          </motion.div>
        </div>
      </motion.section>
  )
}

export default FindUs