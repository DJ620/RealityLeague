import React, { Dispatch, SetStateAction } from "react";

export default function Modal({
  children,
  showModal,
  setShowModal,
}: {
  children: any;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      {showModal && (
        <div className="absolute top-0 left-0 flex items-center justify-center h-screen -mt-12 overflow-hidden w-dvw">
          <div className="absolute top-0 left-0 h-screen bg-white opacity-25 w-dvw" />
          <div className="absolute bg-black border border-white shadow-md w-96 h-80 shadow-slate-500">
            <button
              onClick={() => setShowModal(false)}
              className="w-full pt-2 pr-4 text-2xl text-right hover:text-red-600"
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
