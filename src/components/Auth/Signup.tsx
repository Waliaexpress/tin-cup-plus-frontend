"use client";

import { EmailIcon, PasswordIcon } from "@/assets/icons";
import {toast} from "react-toastify"
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";
import { useState } from "react";
import {  useAdminSignupMutation,} from "@/store/services"

export enum Role {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
  TEAM_LEAD = "TEAM_LEAD",
  MANAGER = "MANAGER",
}

interface SignupFormData {
  email: string;
  password: string;
  role: Role;

}

export default function Signup() {
  const [loading, setLoading] = useState(false);

  const [createUser, {data, isLoading}] =   useAdminSignupMutation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      email: "",
      password: "",
      role: Role.EMPLOYEE, // Default role instead of null

    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    try {
      const response = await createUser(data).unwrap();
      toast.success(response?.message || "Signup successful!");
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      reset()
    }
  };


  return (

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <InputGroup
          label="Email"
          type="email"
          placeholder="Enter your email"
          className="[&_input]:py-[15px]"
          icon={<EmailIcon />}
          control={control}
          name="email"
          errors={errors.email}
        />

        {/* Password Input */}
        <InputGroup
          label="Password"
          type="password"
          placeholder="Enter your password"
          className="[&_input]:py-[15px]"
          icon={<PasswordIcon />}
          control={control}
          name="password"
          errors={errors.password}
      
        />

        {/* Role Selection */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Role
          </label>
          <Controller
            name="role"
            control={control}
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <select
                {...field}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                {Object.values(Role).map((role) => (
                  <option key={role} value={role}>
                    {role.replace("_", " ").toLowerCase()}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.role && (
            <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-medium text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Sign Up
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
        </button>

        {/* Sign In Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Alre have an account?{" "}
          <Link href="/auth/sign-in" className="text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </form>
  
  );
}