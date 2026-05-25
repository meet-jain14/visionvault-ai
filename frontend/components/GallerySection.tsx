"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface ImageItem {
  filename: string;
  path: string;
}

export default function GallerySection() {

  const [images, setImages] =
    useState<ImageItem[]>([]);
  
  const [expanded, setExpanded] =
    useState(false);

  const displayedImages =
    expanded
      ? images
      : images.slice(0, 3);

  async function fetchImages() {

    try {

      const response =
        await axios.get(
          "http://127.0.0.1:8000/api/images"
        );

      setImages(response.data);

    } catch (error) {

      console.error(error);

    }
  }

  useEffect(() => {

    fetchImages();

  }, []);

  return (
    <section id="gallery" className="scroll-mt-36 mt-20">

      <div
        className="
          mb-10
          flex
          items-center
          justify-between
        "
      >

        <div>

          <p
            className="
              mb-3
              text-sm
              uppercase
              tracking-[0.3em]
              text-[#00ffae]
            "
          >
            Dataset Gallery
          </p>

          <h2 className="text-4xl font-bold">
            AI Processed Images
          </h2>

        </div>

        {images.length > 3 && (

          <button
            onClick={() =>
              setExpanded(!expanded)
            }
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              px-6
              py-3
              text-sm
              transition-all
              duration-300
              hover:border-[#00ffae]/30
              hover:bg-[#00ffae]/10
            "
          >
            {
              expanded
                ? "View Less"
                : "View All"
            }
          </button>

        )}

      </div>

      <div className="grid gap-6 transition-all duration-500 ease-in-out md:grid-cols-2 lg:grid-cols-3">

        {displayedImages.map((image) => (

          <div
            key={image.filename}
            className="
              overflow-hidden
              rounded-[28px]
              border
              border-white/10
              bg-white/[0.03]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-[#00ffae]/20
              animate-in
              fade-in
              slide-in-from-bottom-4
            "
          >

            <img
              src={`http://127.0.0.1:8000${image.path}`}
              alt={image.filename}
              className="
                h-64
                w-full
                object-cover
              "
            />

            <div className="p-5">

              <p className="truncate text-sm text-gray-400">
                {image.filename}
              </p>

            </div>

          </div>

        ))}

      </div>
      

    </section>
  );
}