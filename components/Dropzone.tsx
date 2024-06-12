"use client";

import { useEffect, useRef, useState } from "react";
import ReactDropzone from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";
import { LuFileCheck2 } from "react-icons/lu";

import {
  BsFillImageFill,
  BsFileEarmarkTextFill,
  BsFillCameraVideoFill,
} from "react-icons/bs";
import { FaFileAudio } from "react-icons/fa";
import { AiFillFile } from "react-icons/ai";
import Size from "@/utils/size";
import { MdClose } from "react-icons/md";
import loadFfmpeg from "@/utils/ffmpeg";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import shortFileName from '@/utils/shortFileName';

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
  const ffmpegRef = useRef<any>(null);
  const [isConverting, setIsConverting ] = useState<boolean>(false);
  const [file, setFile] = useState<Array<any>>([]);
  const handleHover = (): void => setIsHover(true);
  const handleExitHover = (): void => setIsHover(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const ffmpeg_response: FFmpeg = await loadFfmpeg();
    ffmpegRef.current = ffmpeg_response;
    setIsConverting(true);
  };

  const upload = (data: Array<any>) => {
    handleExitHover();
    setFile(data);
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

  const convert = async () => {
    const updatedFiles = fileAction.map((el) => ({
      ...el,
      isConverting: true,
    }));
    setFileAction(updatedFiles);
    setIsConverting(true);

}

  const handleDeleteAction = (action: FileActionType): void => {
    setFileAction(fileAction.filter((elt) => elt !== action));
    setFile(file.filter((elt) => elt.name !== action.fileName));
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

  if (fileAction.length) {
    return (
      <div className="space-y-6">
        {fileAction.map((properties: FileActionType, i: any) => (
          <div
            key={i}
            className="w-full lg:py-0 py-4 relative rounded-xl h-fit lg:h-20 px-4 lg:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between border border-gray-400 backdrop-blur bg:opacity-5"
          >
            <div className="flex gap-4 items-center">
              <span className="text-xl font-semibold text-gray-500 ">
                {properties.fileType.startsWith("image") ? (
                  <BsFillImageFill className="text-gray-500" />
                ) : properties.fileType.startsWith("video") ? (
                  <BsFillCameraVideoFill className="text-gray-500" />
                ) : properties.fileType.startsWith("audio") ? (
                  <FaFileAudio className="text-gray-500" />
                ) : properties.fileType.startsWith("text") ? (
                  <BsFileEarmarkTextFill className="text-gray-500" />
                ) : (
                  <AiFillFile className="text-gray-500" />
                )}
              </span>
              <div className="flex text-md items-center gap-4 mr-2 w-96">
                <span className="text-md text-clamp font-md font-semibold overflow-x-hidden">
                  {shortFileName(properties.fileName)}
                </span>
                <span className="text-gray-400 text-sm">
                  {Size(properties.fileSize)}
                </span>
              </div>
            </div>
            <span onClick={()=>handleDeleteAction(properties)} className="cursor-pointer hover:bg-gray-100 rounded-md h-10 w-10 flex items-center justify-center text-2xl text-gray-400">
              <MdClose />
            </span>
          </div>
        ))}
      </div>
    );
  }

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
