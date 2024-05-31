"use client";

import { useState } from "react";
import ReactDropzone from "react-dropzone";
import { LuFileCheck2 } from "react-icons/lu";

const Dropzone = () => {
  const [is_hover, setIsHover] = useState<boolean>(false);

  const handleHover = (): void => setIsHover(true);
  const handleExitHover = (): void => setIsHover(false);

  return (
    <ReactDropzone onDragEnter={handleHover} onDragLeave={handleExitHover}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className=" flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {is_hover ? (
              <>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <LuFileCheck2 className="w-10 h-10 mb-3 text-gray-400" />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </ReactDropzone>
  );
};

export default Dropzone;