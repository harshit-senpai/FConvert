export default function shortFileName(fileName: string) {
  const maxLength = 18;

  if (fileName.length > maxLength) {
    const fileNameWithoutExtension = fileName.split(".").slice(0, -1).join(".");

    const fileExtension: any = fileName.split(".").pop();

    const totalCharacters =
      maxLength - (fileNameWithoutExtension.length + fileExtension.length + 3);

    const shortFileName =
      fileNameWithoutExtension.substring(
        0,
        maxLength - fileExtension.length - 3
      ) +
      "..." +
      fileNameWithoutExtension.slice(-totalCharacters) +
      "." +
      fileExtension;

    return shortFileName;
  } else {
    return fileName.trim();
  }
}
