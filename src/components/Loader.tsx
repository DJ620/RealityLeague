"use client";
import { useState, useEffect } from "react";

type props = {
  loading: boolean;
};

export default function Loader({ loading }: props) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setShowLoader(loading);
  }, [loading]);

  return (
    <>
      {showLoader && (
        <div className="h-screen w-screen flex items-center justify-center bg-black bg-opacity-65 absolute top-0">
          <div className="loader">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            <div className="bar4"></div>
            <div className="bar5"></div>
            <div className="bar6"></div>
            <div className="bar7"></div>
            <div className="bar8"></div>
            <div className="bar9"></div>
          </div>
        </div>
      )}
    </>
  );
}
