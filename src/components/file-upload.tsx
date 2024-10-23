"use client";

import toast from "react-hot-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import { UploadButton } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
  onChange: (url?: string, originalFilename?: string) => void;
  endpoint: keyof typeof ourFileRouter;
};

export const FileUpload = ({
  onChange,
  endpoint
}: FileUploadProps) => {
    console.log("subiendo..._ ", endpoint)

  return (
    <UploadButton
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("onClientUploadComplete res:", res);
        onChange(res?.[0].url, res?.[0].name);
      }}
      onUploadError={(error: Error) => {
        console.log("error: ", error.message)
        toast.error(`${error?.message}`);
      }}
    />
  );
}
