import { cloudinary } from "@/app/cloudinary/config";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
