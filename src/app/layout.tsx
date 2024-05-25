import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RealityLeague",
  description: "Fantasy League tracking for reality competition shows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className="relative">
          <div className="fixed top-0 w-full bg-black">
            <Nav />
          </div>
          <div className="p-10 mt-12">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
