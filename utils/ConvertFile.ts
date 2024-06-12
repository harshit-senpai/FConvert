import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

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

const regex = /(?:\.([^.]+))?$/;

function fileExtension(fileName: string) {
  const match = regex.exec(fileName);
  if (match && match[1]) {
    return match[1];
  }
  return "";
}

function removeFileExtension(fileName: string) {
  const index = fileName.lastIndexOf(".");
  if (index !== -1) {
    return fileName.slice(0, index);
  }
  return fileName;
}

export default async function convert(
  ffmpeg: FFmpeg,
  fileAction: FileActionType
) {
  const { file, to, fileName, fileType } = fileAction;
  const input = fileExtension(fileName);
  const output = removeFileExtension(fileName) + "." + to;
  ffmpeg.writeFile(input, await fetchFile(file));

  let command: any = [];

  if (to === "3gp") {
    command = [
      "-i",
      input,
      "-r",
      "20",
      "-s",
      "352x288",
      "-vb",
      "400k",
      "-acodec",
      "aac",
      "-strict",
      "experimental",
      "-ac",
      "1",
      "-ar",
      "8000",
      "-ab",
      "24k",
      output,
    ];
  } else command = ["-i", input, output];

  await ffmpeg.exec(command);

  const data = await ffmpeg.readFile(output);
  const blob = new Blob([data], { type: fileType.split("/")[0] });
  const url = URL.createObjectURL(blob);
  return { url, output };
}
