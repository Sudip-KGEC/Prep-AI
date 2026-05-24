import { DM_Sans, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})


export const metadata = {
  title: {
    template:" %s | PrepHire ",
    default: "PrepHire"
  },
  description: "A tool to help you prepare for your next interview and get your dream placement.",
};

export default function RootLayout({ children }) {
  return (

    <ClerkProvider appearance={{
      theme: dark
    }}>
    <html
      lang="en"
      suppressHydrationWarning={true}
      data-scroll-behavior="smooth"
    >
      <body className={`${lora.variable} ${dmSans.variable} font-sans`} >
        <ThemeProvider
        attribute= "class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
        {/* Header */}
        <Header/>
         <main className="min-h-screen">
              {children}
         </main>
        {/* Footer */}
        <Toaster richColors/>
        <Footer/>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
