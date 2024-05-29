import React, { Children } from "react";

export default function Modal({ children }: { children: any }) {
  return (
    <div className="absolute top-0 left-0 -mt-12 overflow-hidden h-screen w-dvw flex justify-center items-center">
      <div className="absolute top-0 left-0 h-screen w-dvw bg-white opacity-25" />
      <div className="h-[80vh] w-[80vw] border-white border bg-black shadow-md shadow-slate-500 absolute">
        {children}
      </div>
    </div>
  );
}
