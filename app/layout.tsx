import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { AlertProvider } from "@/context/AlertContext";
import { ToastProvider } from "@/context/ToastContext";

const cairo = localFont({
  src: [
    {
      path: "../public/fonts/Cairo.ttf",
      weight: "400",
    },
  ],
  variable: "--font-alexandria",
  display: "auto",
});

export const metadata: Metadata = {
  title: "قاعدة بيانات الطلاب",
  description: "قاعدة بيانات الطلاب الخاصة بإتحاد طلاب الموهبة والتميز",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.className} h-full antialiased`}
    >
      <body className="">
        <AlertProvider>
          <ToastProvider>
            <Header />
            <main className="">{children}</main>
          </ToastProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
