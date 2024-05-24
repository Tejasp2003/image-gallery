"use client";
import ImageGrid from "@/components/image-grid";
import { useToast } from "@/components/ui/use-toast";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const Page = () => {
  const [file, setFile] = useState<File | Blob | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const {toast} = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFile(file);
      uploadStagedFile(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const uploadStagedFile = async (stagedFile: File | Blob) => {
    setUploading(true);
    const form = new FormData();
    form.set("file", stagedFile);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setImageUrl(data.imgUrl);
    toast({
      description: "Image uploaded successfully.",
      className: "bg-green-200",
    })
    
    setUploading(false);
  };

  useEffect(() => {
    if (imageUrl) {
      setRefetch(true);
    }
  }, [imageUrl]);

  return (
    <div className=" container m-auto md:flex md:flex-row space-x-2
    items-center justify-center  min-h-[100vh] grainy flex-col
    ">
      <div className="flex flex-col items-start h-full lg:w-[300px] w-full mt-4 m-auto md:ml-0 ml-2 
        cursor-pointer 
      ">
        <div
          {...getRootProps({
            className:
              " border-dashed border-2 border-gray-400 p-4 rounded-md md:h-[462px] h-56 flex items-center justify-center w-full",
          })}
        >
          <input {...getInputProps()} />
          <div
            className="flex flex-col items-center justify-center text-center text-wrap"
          >

         <h2 className="text-lg font-semibold text-gray-600">
          Welcome to the Image Gallery
        </h2>

        <p className="text-sm text-gray-500">
          Drop an image here or click to select one from your device.
          </p>
          </div>
        </div>
        {uploading && <p>Uploading...</p>}
      </div>
      <ImageGrid refetch={refetch} setRefetch={setRefetch} />
    </div>
  );
};

export default Page;
