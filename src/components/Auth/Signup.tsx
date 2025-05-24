"use client";

import { toast } from "react-toastify";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import InputGroup from "../FormElements/InputGroup";
import { useState } from "react";
import { useAdminSignupMutation } from "@/store/services";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { RouteEnums } from "@/routes/Routes";
import { useRouter } from "next/navigation";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';


export enum Role {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
  TEAM_LEAD = "TEAM_LEAD",
  MANAGER = "MANAGER",
}

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role: Role;
}

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [createUser, { data, isLoading }] = useAdminSignupMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      role: Role.EMPLOYEE,
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    try {
      const response = await createUser(data).unwrap();
      toast.success(response?.message || "Signup successful!");
      reset();
      router.push(RouteEnums.SIGN_IN);
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* First Name Input */}
      <InputGroup
        label="First Name"
        type="text"
        placeholder="Enter your first name"
        className="[&_input]:py-[15px]"
        icon={<User size={20} />}
        control={control}
        name="firstName"
        errors={errors.firstName}
      />

      {/* Last Name Input */}
      <InputGroup
        label="Last Name"
        type="text"
        placeholder="Enter your last name"
        className="[&_input]:py-[15px]"
        icon={<User size={20} />}
        control={control}
        name="lastName"
        errors={errors.lastName}
      />

      {/* Email Input */}
      <InputGroup
        label="Email"
        type="email"
        placeholder="Enter your email"
        className="[&_input]:py-[15px]"
        icon={<Mail size={20} />}
        control={control}
        name="email"
        errors={errors.email}
      />

      {/* Password Input with toggle visibility */}
      <div className="relative">
        <InputGroup
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="[&_input]:py-[15px]"
          icon={null}
          control={control}
          name="password"
          errors={errors.password}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-12 text-gray-500 focus:outline-none"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <Controller
        name="phone"
        control={control}
        rules={{
          required: false,
          validate: (value) => {
            if (value && value.length < 8) return "Enter a valid phone number";
            return true;
          },
        }}
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium mb-1">Phone (Optional)</label>
            <PhoneInput
              country={'us'}
              enableSearch
              value={field.value}
              onChange={(value) => field.onChange(value)}
              inputStyle={{
                width: '100%',
                paddingTop: "24px",
                paddingBottom: '24px',
                borderRadius: '0.5rem',
                border: '1px solid #ccc',
              }}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        )}
      />


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
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
}