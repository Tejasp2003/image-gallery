
import { cloudinary } from "@/app/cloudinary/config";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

type UploadResponse =
  | { success: true; result?: UploadApiResponse }
  | { success: false; error: UploadApiErrorResponse };

export const uploadToCloudinary = (
  fileUri: string,
  fileName: string
): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder: "image-gallery", // any sub-folder name in your cloud
        use_filename: true,
      })
      .then((result) => {
        resolve({ success: true, result });
      })
      .catch((error) => {
        reject({ success: false, error });
      });
  });
};


export async function POST(req: NextRequest) {
    

  try {
    const formData = await req.formData();
  const file = formData.get("file") as File;

  const fileBuffer = await file.arrayBuffer();

  const mimeType = file.type;
  const encoding = "base64";
  const base64Data = Buffer.from(fileBuffer).toString("base64");

  
  const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

  const res = await uploadToCloudinary(fileUri, file.name);

  if (res.success && res.result) {
    return NextResponse.json({
      message: "success",
      imgUrl: res.result.secure_url,
    });
  } else return NextResponse.json({ message: "failure" });
    
  } catch (error) {
    return NextResponse.json({ message: "failure" });
    
  }
}

