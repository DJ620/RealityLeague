"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Pacifico } from "next/font/google";
import Underline from "./underline";

const pacifico = Pacifico({ weight: ["400"], subsets: ["latin"] });

export default function Nav() {
  const { user, isLoaded } = useUser();
  return (
    <header>
      <nav
        className="flex items-center justify-between py-6 pr-6 lg:px-8 h-20 border border-t-0 border-l-0 border-r-0 border-b-gray-600"
        aria-label="Global"
      >
        <div className="flex">
          <div className="relative scale-75 mt-3">
            <a
              href="/"
              className={`-m-1.5 p-1.5 text-3xl ${pacifico.className}`}
            >
              <span className="text-blue-500">Reality</span>
              <span className="text-yellow-400">League</span>
            </a>
            <div className="bottom-0 -mt-5 -mb-7 flex justify-center">
              <Underline />
            </div>
          </div>
        </div>
        {isLoaded && user && (
          <div className="flex items-center">
            <Link href="/dashboard">Dashboard</Link>
            <div className="ml-5">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
