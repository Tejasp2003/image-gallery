import { cloudinary } from "@/app/cloudinary/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "image-gallery",
      max_results: 20,
    });

    const images = result.resources.map((resource: any) => resource.secure_url);
    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ images: [] });
  }
}
