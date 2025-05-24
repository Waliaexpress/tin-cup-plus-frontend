import { PackageService } from "@/types/packages";
import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const ServiceItem = ({ service }: { service: PackageService }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center p-3 border-b border-gray-100 last:border-none">
      <div className="mr-3 bg-primary/10 p-2 rounded-full">
        <ShoppingBag size={16} className="text-primary" />
      </div>
      <div>
        <h4 className="font-medium">
          {service.name?.en || service.name?.am || 'Unnamed Service'}
        </h4>
        {(service.description?.en || service.description?.am) && (
          <p className="text-sm text-gray-600 line-clamp-1">
            {service.description?.en || service.description?.am}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ServiceItem;