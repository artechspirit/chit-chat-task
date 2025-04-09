"use client";
import { Provider } from "react-redux";
import { store } from "../store";
import { Lato } from "next/font/google";
import "./globals.css";

import Image from "next/image";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={`${lato.className} antialiased`}>
          <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-[#4f4f4f] text-white p-4 border-r-white border-r"></div>

            {/* Main Content */}
            <div className="flex-1">
              <header className="flex justify-between items-center bg-[#828282] h-16">
                <Image
                  className="ml-4"
                  src="/icons/search.svg"
                  width={24}
                  height={24}
                  alt="Search Icon"
                />
              </header>

              <main>{children}</main>
            </div>
          </div>
        </body>
      </html>
    </Provider>
  );
}
