"use client";

import { useState } from "react";
import ReactDropzone from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";
import { LuFileCheck2 } from "react-icons/lu";

interface FileActionType {
  file: any;
  fileName: string;
  fileSize: number;
  from: string;
  to: String | null;
  fileType: string;
  isConverting?: boolean;
  isConverted?: boolean;
  isError?: boolean;
  url?: any;
  output?: any;
}

const Dropzone = () => {
  const { toast } = useToast();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [fileAction, setFileAction] = useState<FileActionType[]>([]);
  const [file, setFile] = useState<Array<any>>([]);
  const handleHover = (): void => setIsHover(true);
  const handleExitHover = (): void => setIsHover(false);

  const upload = (data: Array<any>) => {
    handleExitHover();
    setFileAction(data);
    const fileProperty: FileActionType[] = [];
    data.forEach((file: any) => {
      fileProperty.push({
        file,
        fileName: file.name,
        fileSize: file.size,
        from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
        to: null,
        fileType: file.type,
        isConverted: false,
        isConverting: false,
        isError: false,
      });
    });
    console.log(fileProperty);
    setFileAction(fileProperty);
  };

  const accepted_files = {
    "image/*": [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".webp",
      ".ico",
      ".tif",
      ".tiff",
      ".raw",
      ".tga",
    ],
    "audio/*": [],
    "video/*": [],
  };

  return (
    <ReactDropzone
      onDrop={upload}
      onDragEnter={handleHover}
      onDragLeave={handleExitHover}
      accept={accepted_files}
      onDropRejected={() => {
        handleExitHover();
        toast({
          variant: "destructive",
          title: "Error uploading your file(s)",
          description: "Allowed Files: Audio, Video and Images.",
          duration: 5000,
        });
      }}
      onError={() => {
        handleExitHover();
        toast({
          variant: "destructive",
          title: "Error uploading your file(s)",
          description: "Allowed Files: Audio, Video and Images.",
          duration: 5000,
        });
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className=" flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isHover ? (
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
