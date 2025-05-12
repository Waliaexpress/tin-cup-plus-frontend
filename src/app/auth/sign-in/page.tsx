import Signin from "@/components/Auth/Signin";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// export const metadata: Metadata = {
//   title: "Sign in",
// };

export default function SignIn() {
  return (
    <>
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-15 bg-[url('/images/bg/authbg.avif')] md:bg-none bg-cover bg-center">
            <div className="md:hidden w-full mb-16 mt-2">
            <Link  className=" w-full inline-block text-[28px] text-center md:hidden font-serif font-semibold tracking-wide leading-[60px] text-primary transition-colors duration-300" href="/">
              Tin Cup Plus Restaurant
              </Link>
              <div className=" h-1 w-16 bg-primary mx-auto rounded-full"></div>
              <p className="mt-6 text-lg font-medium text-center text-gray-700 dark:text-white italic">
             Sign in
              </p>
            </div>
              <Signin />
            </div>
          </div>

          <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
          <div
             style={{backgroundImage: "url('/images/bg/authbg.avif')", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
            className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-40 dark:!bg-dark-2 dark:bg-none h-[calc(100vh-100px)] ">
            <div className="flex flex-col text-center justify-center items-center mt-6">
            <Link  className="mb-16 inline-block text-5xl font-serif font-semibold tracking-wide leading-[60px] text-primary  transition-colors duration-300" href="/">
              Tin Cup Plus<br/> Restaurant
              </Link>

              <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                Sign in to your account
              </p>

              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                Welcome Back!
              </h1>

              <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                Sign in to get started by completing the necessary fields
              </p>

            </div>
              <div className="mt-31">
                <Image
                  src="/images/grids/grid-02.svg"
                  alt="Illustration"
                  width={405}
                  height={325}
                  className="mx-auto dark:opacity-30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
