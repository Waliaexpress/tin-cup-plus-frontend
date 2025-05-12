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
import StoreProvider from "./admin/providers/StoreProvider";
import { Providers } from "./admin/providers/themProviders";
import ReduxProvider from "@/providers/ReduxProvider";

// export const metadata: Metadata = {
//   title: {
//     template: "%s | Task Manager - Task Kit",
//     default: "Task Kit - Task and Performance Kit",
//   },
//   description: "Task and Performance Management System.",
// };

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StoreProvider>
          <Providers>
            <ReduxProvider>
              <NextTopLoader showSpinner={false} />

              <ToastContainer position="top-right" autoClose={5000} />

              <div className="flex min-h-screen">
                <div className="w-full bg-white dark:bg-[#020d1a]">

                  <main className="isolate mx-auto w-full  overflow-hidden ">
                    {children}
                  </main>
                </div>
              </div>
            </ReduxProvider>
          </Providers>
        </StoreProvider>
      </body>
    </html>
  );
}
