import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "School Events Management",

};
const ReduxProvider = dynamic(() => import("@/store/redux-provider"), {
  ssr: false
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

      <html lang="en">
        <body className={inter.className}>
          <ReduxProvider>  {children} <ToastContainer position="bottom-right" theme="dark" /></ReduxProvider>
        </body>
      </html>

    </ClerkProvider>
  );
}
