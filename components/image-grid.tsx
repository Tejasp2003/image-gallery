import React, { useEffect, useState } from "react";
import Image from "next/image";

const ImageGrid = ({
  refetch,
  setRefetch,
}: {
  refetch: boolean;
  setRefetch: (value: boolean) => void;
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchImages = async () => {
      const res = await fetch("/api/get-images");
      const data = await res.json();
      setImages(data.images);
      setLoading(false);
    };

    fetchImages();
    setRefetch(false);
  }, [refetch, setRefetch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full">
      {loading && (
        <>
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="relative w-full h-56 animate-pulse bg-gray-300 rounded-md"></div>
          ))}
        </>
      )}
      {!loading &&
        images.map((image, index) => (
          <div key={index} className="relative w-full h-56">
            <Image
              src={image}
              alt={`Uploaded image ${index}`}
              layout="fill"
              objectFit="cover"
              className="rounded-md border-2 border-gray-600"
              loading="lazy"
              blurDataURL={image}
            />
          </div>
        ))}
    </div>
  );
};

export default ImageGrid;
