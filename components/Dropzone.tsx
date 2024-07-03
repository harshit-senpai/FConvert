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
import { MdClose, MdDone } from "react-icons/md";
import loadFfmpeg from "@/utils/ffmpeg";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import shortFileName from "@/utils/shortFileName";
import convertFile from "@/utils/ConvertFile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImSpinner3 } from "react-icons/im";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { BiError } from "react-icons/bi";
import { Skeleton } from "./ui/skeleton";
import { HiOutlineDownload } from "react-icons/hi";

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

const extensions = {
  image: [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "ico",
    "tif",
    "tiff",
    "svg",
    "raw",
    "tga",
  ],
  video: [
    "mp4",
    "m4v",
    "mp4v",
    "3gp",
    "3g2",
    "avi",
    "mov",
    "wmv",
    "mkv",
    "flv",
    "ogv",
    "webm",
    "h264",
    "264",
    "hevc",
    "265",
  ],
  audio: ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"],
};

const Dropzone = () => {
  const { toast } = useToast();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [fileAction, setFileAction] = useState<FileActionType[]>([]);
  const ffmpegRef = useRef<any>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [isLoaded, setLoaded] = useState<boolean>(true);
  const [defaultValues, setDefaultValues] = useState<string>("video");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("...");
  const [selectedVideo, setSelectedVideo] = useState<string>("...");
  const [selectedAudio, setSelectedAudio] = useState<string>("...");
  const [selected, setSelected] = useState<string>("...");
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
    setFileAction(fileProperty);
  };

  const downloadAll = (): void => {
    for (let action of fileAction) {
      !action.isError && download(action);
    }
  };

  const download = (action: FileActionType) => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = action.url;
    a.download = action.output;

    document.body.appendChild(a);
    a.click();

    // Clean up after download
    URL.revokeObjectURL(action.url);
    document.body.removeChild(a);
  };

  const reset = () => {
    setIsDone(false);
    setFileAction([]);
    setFile([]);
    setIsReady(false);
    setIsConverting(false);
  };

  const convert = async (): Promise<any> => {
    let tmp = fileAction.map((el) => ({
      ...el,
      is_converting: true,
    }));
    setFileAction(tmp);
    setIsConverting(true);
    for (let action of tmp) {
      try {
        const { url, output } = await convertFile(ffmpegRef.current, action);
        tmp = tmp.map((el) =>
          el === action
            ? {
                ...el,
                is_converted: true,
                is_converting: false,
                url,
                output,
              }
            : el
        );
        setFileAction(tmp);
      } catch (err) {
        tmp = tmp.map((el) =>
          el === action
            ? {
                ...el,
                is_converted: false,
                is_converting: false,
                is_error: true,
              }
            : el
        );
        setFileAction(tmp);
      }
    }
    setIsDone(true);
    setIsConverting(false);
  };

  const updateAction = (fileName: String, to: String) => {
    setFileAction(
      fileAction.map((action): FileActionType => {
        if (action.fileName === fileName) {
          console.log("FOUND");
          return {
            ...action,
            to,
          };
        }

        return action;
      })
    );
  };

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
  const checkIsReady = (): void => {
    let tmp_is_ready = true;
    fileAction.forEach((action: FileActionType) => {
      if (!action.to) tmp_is_ready = false;
    });
    setIsReady(tmp_is_ready);
  };

  useEffect(() => {
    if (!fileAction.length) {
      setIsDone(false);
      setFile([]);
      setIsReady(false);
      setIsConverting(true);
    } else checkIsReady();
  }, [fileAction]);

  if (fileAction.length) {
    return (
      <div className="space-y-6">
        {fileAction.map((action: FileActionType, i: any) => (
          <div
            key={i}
            className="w-full py-4 space-y-2 lg:py-0 relative cursor-pointer rounded-xl border h-fit lg:h-20 px-4 lg:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between"
          >
            <div className="flex gap-4 items-center">
              <span className="text-2xl text-orange-600">
              {action.fileType.startsWith("image") ? (
                  <BsFillImageFill className="text-gray-500" />
                ) : action.fileType.startsWith("video") ? (
                  <BsFillCameraVideoFill className="text-gray-500" />
                ) : action.fileType.startsWith("audio") ? (
                  <FaFileAudio className="text-gray-500" />
                ) : action.fileType.startsWith("text") ? (
                  <BsFileEarmarkTextFill className="text-gray-500" />
                ) : (
                  <AiFillFile className="text-gray-500" />
                )}
              </span>
              <div className="flex items-center gap-1 w-96">
                <span className="text-md font-medium overflow-x-hidden">
                  {shortFileName(action.fileName)}
                </span>
                <span className="text-gray-400 text-sm">
                  ({Size(action.fileSize)})
                </span>
              </div>
            </div>

            {action.isError ? (
              <Badge variant="destructive" className="flex gap-2">
                <span>Error Converting File</span>
                <BiError />
              </Badge>
            ) : action.isConverted ? (
              <Badge variant="default" className="flex gap-2 bg-green-500">
                <span>Done</span>
                <MdDone />
              </Badge>
            ) : action.isConverting ? (
              <Badge variant="default" className="flex gap-2">
                <span>Converting</span>
                <span className="animate-spin">
                  <ImSpinner3 />
                </span>
              </Badge>
            ) : (
              <div className="text-gray-400 text-md flex items-center gap-4">
                <span>Convert to</span>
                <Select
                  onValueChange={(value) => {
                    if (extensions.audio.includes(value)) {
                      setDefaultValues("audio");
                    } else if (extensions.video.includes(value)) {
                      setDefaultValues("video");
                    }
                    setSelected(value);
                    updateAction(action.fileName, value);
                  }}
                  value={selected}
                >
                  <SelectTrigger className="w-32 outline-none focus:outline-none focus:ring-0 text-center text-gray-600 bg-gray-50 text-md font-medium">
                    <SelectValue placeholder="..." />
                  </SelectTrigger>
                  <SelectContent className="h-fit">
                    {action.fileType.includes("image") && (
                      <div className="grid grid-cols-2 gap-2 w-fit">
                        {extensions.image.map((elt, i) => (
                          <div key={i} className="col-span-1 text-center">
                            <SelectItem value={elt} className="mx-auto">
                              {elt}
                            </SelectItem>
                          </div>
                        ))}
                      </div>
                    )}
                    {action.fileType.includes("video") && (
                      <Tabs defaultValue={defaultValues} className="w-full">
                        <TabsList className="w-full">
                          <TabsTrigger value="video" className="w-full">
                            Video
                          </TabsTrigger>
                          <TabsTrigger value="audio" className="w-full">
                            Audio
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="video">
                          <div className="grid grid-cols-3 gap-2 w-fit">
                            {extensions.video.map((elt, i) => (
                              <div key={i} className="col-span-1 text-center">
                                <SelectItem value={elt} className="mx-auto">
                                  {elt}
                                </SelectItem>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="audio">
                          <div className="grid grid-cols-3 gap-2 w-fit">
                            {extensions.audio.map((elt, i) => (
                              <div key={i} className="col-span-1 text-center">
                                <SelectItem value={elt} className="mx-auto">
                                  {elt}
                                </SelectItem>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    )}
                    {action.fileType.includes("audio") && (
                      <div className="grid grid-cols-2 gap-2 w-fit">
                        {extensions.audio.map((elt, i) => (
                          <div key={i} className="col-span-1 text-center">
                            <SelectItem value={elt} className="mx-auto">
                              {elt}
                            </SelectItem>
                          </div>
                        ))}
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            {action.isConverted ? (
              <Button variant="outline" onClick={() => download(action)}>
                Download
              </Button>
            ) : (
              <span
                onClick={() => handleDeleteAction(action)}
                className="cursor-pointer hover:bg-gray-50 rounded-full h-10 w-10 flex items-center justify-center text-2xl text-gray-400"
              >
                <MdClose />
              </span>
            )}
          </div>
        ))}
        <div className="flex w-full justify-end">
          {isDone ? (
            <div className="space-y-4 w-fit">
              <Button
                size="lg"
                className="rounded-xl font-semibold relative py-4 text-md flex gap-2 items-center w-full"
                onClick={downloadAll}
              >
                {fileAction.length > 1 ? "Download All" : "Download"}
                <HiOutlineDownload />
              </Button>
              <Button
                size="lg"
                onClick={reset}
                variant="outline"
                className="rounded-xl"
              >
                Convert Another File(s)
              </Button>
            </div>
          ) : (
            <Button
              size="lg"
              disabled={!isReady}
              className="rounded-xl font-semibold relative py-4 text-md flex items-center w-44"
              onClick={convert}
            >
              {(
                <span>Convert Now</span>
              )}
            </Button>
          )}
        </div>
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
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
