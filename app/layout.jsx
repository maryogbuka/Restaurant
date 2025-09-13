import { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast";
import Navbar from './components/nav'
import Footer from './components/footer'
import { CartProvider } from './context/CartContext'
import { Doto, Caveat, Poppins } from 'next/font/google'
import { Bitter } from 'next/font/google'
import Script from "next/script"   

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const bitter = Bitter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-bitter'
})

export const doto = Doto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-doto'
})

export const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat'
})

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-poppins'
})

export const metadata = {
  title: "Ozi's Food",
  description: "Your favorite spot for delicious meals!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script src="https://js.paystack.co/v1/inline.js" strategy="beforeInteractive" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <CartProvider>{children}</CartProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <Footer />
      </body>
    </html>
  );
}
