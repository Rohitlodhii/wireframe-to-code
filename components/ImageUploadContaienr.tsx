"use client";
 
import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/FileUploader";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { DropzoneOptions } from "react-dropzone";

interface FileUploadProps {
  files: File[] | null;
  setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
}

 
const FileUploadDropzone: FC<FileUploadProps> = ({ files, setFiles }) => {
  
 
  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: 1,
    maxSize: 1 * 1024 * 1024,
  } satisfies DropzoneOptions;
 
  return (
    <FileUploader
      value={files}
      onValueChange={setFiles}
      dropzoneOptions={dropzone}
      
    >
      <FileInput >
        <div className="flex flex-col gap-2 items-center  justify-center h-44 w-full shadow-lg md:w-full border border-dashed bg-background rounded-md">
            <CloudUpload />
          <p className="text-gray-400 text-sm px-6">Click or Drag your wireframe here</p>
        </div>
      </FileInput>
      <FileUploaderContent className="flex items-center flex-row gap-2">
        {files?.map((file, i) => (
          <FileUploaderItem
            key={i}
            index={i}
            className="size-20 p-0 rounded-md overflow-hidden"
            aria-roledescription={`file ${i + 1} containing ${file.name}`}
          >
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name}
              height={80}
              width={80}
              className="size-20 p-0"
            />
          </FileUploaderItem>
        ))}
      </FileUploaderContent>
    </FileUploader>
  );
};
 
export default FileUploadDropzone;