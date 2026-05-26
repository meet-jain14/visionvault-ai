"use client";

import axios from "axios";
import { useState } from "react";

interface SearchResult {
  id: string;
  document: string;
  distance: number;
}

export default function SearchSection() {

  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);
  
  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [selectedImage, setSelectedImage] =
    useState<any>(null);

  async function handleSearch() {

    if (!query) return;

    setLoading(true);

    try {

      const response =
        await axios.get(
          `process.env.NEXT_PUBLIC_API_URL/api/search?query=${query}`
        );

      const formattedResults =
        response.data.ids[0].map(
          (
            id: string,
            index: number
          ) => ({
            id,
            document:
              response.data.documents[0][index],
            distance:
              response.data.distances[0][index],
          })
        );

      setResults(
        formattedResults
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  }

  async function handleImageSearch() {

    if (!imageFile) return;
  
    const formData =
      new FormData();
  
    formData.append(
      "file",
      imageFile
    );
  
    setLoading(true);
  
    try {
  
      const response =
        await axios.post(
          "process.env.NEXT_PUBLIC_API_URL/api/search-by-image",
          formData
        );
  
      const formattedResults =
        response.data.ids[0].map(
          (
            id: string,
            index: number
          ) => ({
  
            id,
  
            document:
              response.data.documents[0][index],
  
            distance:
              response.data.distances[0][index],
  
          })
        );
  
      setResults(
        formattedResults
      );
  
    } catch (error) {
  
      console.error(error);
  
    } finally {
  
      setLoading(false);
  
    }
  }

  return (
    <section id="search" className="scroll-mt-36 mt-20 rounded-[32px] border border-white/10 bg-white/[0.03] p-8">

      <div className="mb-8">

        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#00ffae]">
          Semantic Search
        </p>

        <h2 className="text-4xl font-bold">
          Search Images By Meaning
        </h2>

      </div>

      <div
        className="
          mt-10
          grid
          gap-8
          lg:grid-cols-2
        "
      >

        {/* TEXT SEARCH */}

        <div
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            p-8
          "
        >

          <h3
            className="
              mb-6
              text-2xl
              font-semibold
            "
          >
            Search by Text
          </h3>

          <div
            className="
              flex
              flex-col
              gap-4
            "
          >

            <input
              type="text"

              value={query}

              onChange={(e) =>
                setQuery(
                  e.target.value
                )
              }

              placeholder="
                e.g. cricket stadium crowd
              "

              className="
                flex-1
                rounded-2xl
                border
                border-white/10
                bg-black
                px-5
                py-4
                outline-none
              "
            />

            <button
              onClick={handleSearch}
              disabled={loading}

              className="
                disabled:cursor-not-allowed
                disabled:opacity-60
                w-fit
                rounded-2xl
                bg-[#00ffae]
                px-8
                py-4
                font-semibold
                text-black
                transition-all
                hover:scale-105
              "
            >

            {
              loading
                ? "Searching..."
                : "Search"
            }

            </button>

          </div>

        </div>

        {/* IMAGE SEARCH */}

        <div
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            p-8
          "
        >

          <h3
            className="
              mb-6
              text-2xl
              font-semibold
            "
          >
            Image Search
          </h3>

          <div
            className="
              flex
              flex-col
              gap-5
            "
          >

            <input
              type="file"

              accept="image/*"

              onChange={(e) => {

                const file =
                  e.target.files?.[0];

                if (file) {

                  setImageFile(file);

                }

              }}

              className="
                rounded-2xl
                border
                border-dashed
                border-white/10
                bg-black
                p-4
                text-sm
                text-gray-400
              "
            />

            <button
              onClick={handleImageSearch}
              disabled={loading}

              className="
                disabled:cursor-not-allowed
                disabled:opacity-60
                w-fit
                rounded-2xl
                bg-[#00ffae]
                px-8
                py-4
                font-semibold
                text-black
                transition-all
                hover:scale-105
              "
            >

            {
              loading
                ? "Analyzing..."
                : "Search By Image"
            }

            </button>

          </div>

        </div>

      </div>

      <div
        className="
          mt-10
          grid
          gap-6
          md:grid-cols-2
          lg:grid-cols-3
        "
      >

        {results.map((result) => (

          <div
            key={result.id}

            onClick={() =>
              setSelectedImage(result)
            }

            className="
              cursor-pointer
              rounded-[28px]
              border
              border-white/10
              bg-black/30
              p-5
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-[#00ffae]/40
              hover:shadow-[0_0_40px_rgba(0,255,174,0.1)]
            "
          >

            <img
              src={`process.env.NEXT_PUBLIC_API_URL/datasets/uploads/${result.id}`}

              alt={result.id}

              className="
                mb-4
                h-56
                w-full
                rounded-2xl
                object-cover
              "
            />

            <p
              className="
                line-clamp-2
                text-sm
                text-gray-300
              "
            >
              {result.document}
            </p>

            <p
              className="
                mt-4
                text-xs
                font-medium
                text-[#00ffae]
              "
            >
              Match:
              {" "}

              {
                (
                  (
                    1 - result.distance
                  ) * 100
                ).toFixed(0)
              }
              %
            </p>

          </div>

        ))}

      </div>

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
                max-w-4xl
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
                src={
                  `process.env.NEXT_PUBLIC_API_URL/datasets/uploads/${selectedImage.id}`
                }

                alt=""

                className="
                  max-h-[70vh]
                  w-full
                  object-cover
                "
              />

              <div
                className="
                  p-6
                "
              >

                <p
                  className="
                    text-lg
                    text-white
                  "
                >
                  {
                    selectedImage.document
                  }
                </p>

                <p
                  className="
                    mt-4
                    text-[#00ffae]
                  "
                >
                  Match:
                  {" "}

                  {
                    (
                      (
                        1 - selectedImage.distance
                      ) * 100
                    ).toFixed(0)
                  }
                  %
                </p>

              </div>

            </div>

          </div>

        )
      }

    </section>
  );
}