"use client";

import { UseFormRegister } from "react-hook-form";
import { FormValues } from "../types";

interface AvailabilitySectionProps {
  register: UseFormRegister<FormValues>;
}

export default function AvailabilitySection({ register }: AvailabilitySectionProps) {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-dark dark:text-white font-medium">
              Active Status
            </div>
            <p className="text-sm text-body-color">
              Toggle to show or hide this item on the menu
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              {...register("isActive")}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-dark dark:text-white font-medium">
              Available for Order
            </div>
            <p className="text-sm text-body-color">
              Toggle to mark this item as available or out of stock
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              {...register("isAvailable")}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-dark dark:text-white font-medium">
              Special
            </div>
            <p className="text-sm text-body-color">
              Toggle to mark this item as special
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              {...register("isSpecial")}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
