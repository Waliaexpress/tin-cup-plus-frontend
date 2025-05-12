"use client";

import "@/css/satoshi.css";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import StoreProvider from "./providers/StoreProvider";
import { Providers } from "./providers/themProviders";


// export const metadata: Metadata = {
//   title: {
//     template: "%s | Task Manager - Task Kit",
//     default: "Task Kit - Task and Performance Kit",
//   },
//   description: "Task and Performance Management System.",
// };

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <Providers>

    <div className="flex min-h-screen w-full">
      <Sidebar />

      <div className="w-full bg-gray-100 dark:bg-[#020d1a]">
        <Header />

        <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-4 2xl:p-7">
          {children}
        </main>
      </div>
    </div>
    </Providers>

  );
}
