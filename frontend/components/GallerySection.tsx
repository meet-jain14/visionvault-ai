"use client";

import axios from "axios";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ImageItem {
  filename: string;
  path: string;
}

export default function GallerySection() {

  const [images, setImages] =
    useState<ImageItem[]>([]);
  
  const [expanded, setExpanded] =
    useState(false);
  const [selectedImage, setSelectedImage] =
    useState<ImageItem | null>(null);

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
    <section id="gallery" className="scroll-mt-36 mt-20 w-full">

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

      {
        images.length === 0 ? (

          <div
            className="
              mt-10
              rounded-3xl
              border
              border-dashed
              border-white/10
              bg-white/[0.02]
              p-16
              text-center
            "
          >

            <p
              className="
                text-2xl
                font-semibold
                text-white
              "
            >
              No images uploaded yet
            </p>

            <p
              className="
                mt-3
                text-gray-400
              "
            >
              Upload a dataset to begin semantic search.
            </p>

          </div>

        ) : (

          <motion.div
           
            initial={{
              opacity: 0,
              y: 40
            }}

            whileInView={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.6
            }}

            viewport={{
              once: true
            }}

            className="
              mt-10
              grid
              w-full
              grid-cols-1
              gap-6
              md:grid-cols-2
              lg:grid-cols-3
            "
          >

            {displayedImages.map(
              (image) => (

                <div
                  key={image.filename}

                
                  onClick={() =>
                    setSelectedImage(image)
                  }

                  className="
                    cursor-pointer
                    w-full
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-white/10
                    bg-black/30
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-[#00ffae]/40
                    hover:shadow-[0_0_40px_rgba(0,255,174,0.1)]
                  "
                >
                 

                <div className="relative">

                <img
                  src={`http://127.0.0.1:8000${image.path}`}
                  alt={image.filename}
                  className="
                    h-64
                    w-full
                    object-cover
                  "
                />

                <a
                  href={`http://127.0.0.1:8000${image.path}`}

                  target="_blank"

                  rel="noopener noreferrer"

                  onClick={(e) =>
                    e.stopPropagation()
                  }

                  className="
                    absolute
                    right-4
                    top-4
                    z-10
                    rounded-full
                    border
                    border-white/10
                    bg-black/50
                    p-3
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:border-[#00ffae]/40
                    hover:bg-[#00ffae]/10
                  "
                >

                  <Download
                    size={18}
                    className="text-white"
                  />

                </a>

                </div>

                </div>

              )
            )}

          </motion.div>

        )
      }

{
  selectedImage && (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/80
        p-6
        backdrop-blur-sm
      "

      onClick={() =>
        setSelectedImage(null)
      }
    >

      <div
        className="
          max-w-5xl
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-[#0a0a0a]
        "

        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <img
          src={`http://127.0.0.1:8000${selectedImage.path}`}

          alt={selectedImage.filename}

          className="
            max-h-[80vh]
            w-full
            object-cover
          "
        />

        <div
          className="
            border-t
            border-white/10
            p-5
          "
        >

          <p
            className="
              text-sm
              text-gray-400
            "
          >
            {selectedImage.filename}
          </p>

        </div>

      </div>

    </div>

  )
}

    </section>
  );
}