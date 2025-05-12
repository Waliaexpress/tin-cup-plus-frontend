"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";
import { useState } from "react";
import { toast } from "react-toastify";
import { Mail, Eye, EyeOff } from "lucide-react";
import { RouteEnums } from "@/routes/Routes";
import { useLoginMutation } from "@/store/services";



interface SignInFormData {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginResponse {
  error: boolean;
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      role: string;
      status: string;
      firstName: string;
      lastName: string;
    };
    token: string;
  };
}

export default function Signin() {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: SignInFormData) => {
    setLoading(true);
    try {
      
      const response = await login({ email: data.email, password: data.password }).unwrap();
      if (response.success) {
        const { user, token } = response.data
        localStorage.setItem('tin-cup-token', token);    
      toast.success('Sign-in successful!');
        
        if (user?.role === 'admin') {
          push('/admin');
        } else {
          push('/');
        }
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || 'Failed to sign in. Please try again.'
      );
      console.error('Sign-in error:', error);
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
          icon={<Mail size={20} />}
          control={control}
          name="email"
          errors={errors.email}
        />

        <div className="relative mb-5">
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
            className="absolute right-3 top-14 text-gray-500 focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
          <div className="flex items-center gap-2">
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="Remember me"
                  name="remember"
                  withIcon="check"
                  minimal
                  radius="md"
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                />
              )}
            />
          </div>
          <Link
            href="/auth/forgot-password"
            className="hover:text-primary dark:text-white dark:hover:text-primary transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

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

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Don&apos;t have an account?{" "}
          <Link
            href={RouteEnums.SIGN_UP}
            className="text-primary hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}