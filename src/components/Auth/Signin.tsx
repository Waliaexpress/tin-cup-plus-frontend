"use client";

import { EmailIcon, PasswordIcon } from "@/assets/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";
import { useState } from "react";
import { useLoginMutation } from "@/store/services";
import { toast } from "react-toastify";

interface SignInFormData {
  email: string;
  password: string;
  remember: boolean;
}

export default function Signin() {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [login] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: SignInFormData) => {
    setLoading(true);
    try {
      const response = await login(data).unwrap();
      console.log(response, "res")
      if(response?.success){
        await  localStorage.setItem("authToken", response?.data?.token)
        toast.success(response?.message || "Sign-in successful!");

        push("/");
      }
  
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to sign in. Please try again."
      );
      console.error("Sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* Email Input */}
        <InputGroup
          label="Email"
          type="email"
          placeholder="Enter your email"
          className="mb-4 [&_input]:py-[15px]"
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
          className="mb-5 [&_input]:py-[15px]"
          icon={<PasswordIcon />}
          control={control}
          name="password"
          errors={errors.password}
        />

        {/* Remember Me and Forgot Password */}
        <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
          <Link
            href="/auth/forgot-password"
            className="hover:text-primary dark:text-white dark:hover:text-primary transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          Sign In
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="text-primary hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}