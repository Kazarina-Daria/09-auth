import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanstackProvider from "../components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const roboto = Roboto ({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
})

export const metadata : Metadata = {
  title : "Notes App",
  description : "A simple notes application built with Next.js",
  openGraph:{
    title: "Notes App",
    description: "A simple notes application built with Next.js",
    url: "https://08-zustand-ten-dusky.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "Notes App",
      },
    ],
  },
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  sidebar?: React.ReactNode;
   modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body className={roboto.variable}>
      <TanstackProvider>
        <AuthProvider>
           <Header />
        {children}
        {modal}
        <Footer />
        </AuthProvider>
        <div id="modal-root" />
      </TanstackProvider>
       </body>
    </html>
  );
}
