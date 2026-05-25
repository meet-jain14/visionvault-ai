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

  async function handleSearch() {

    if (!query) return;

    setLoading(true);

    try {

      const response =
        await axios.get(
          `http://127.0.0.1:8000/api/search?query=${query}`
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

      <div className="flex flex-col gap-4 md:flex-row">

        <input
          type="text"
          placeholder="e.g. cricket stadium crowd"
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          className="
            flex-1
            rounded-2xl
            border
            border-white/10
            bg-black/30
            p-4
            outline-none
          "
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="
            rounded-2xl
            bg-[#00ffae]
            px-6
            py-4
            font-medium
            text-black
            transition-all
            duration-300
            hover:scale-[1.03]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {
            loading
              ? "Searching..."
              : "Search"
          }
        </button>

      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {results.map((result) => (

          <div
            key={result.id}
            className="
              rounded-[28px]
              border
              border-white/10
              bg-black/30
              p-5
            "
          >

            <img
              src={`http://127.0.0.1:8000/datasets/uploads/${result.id}`}
              alt={result.id}
              className="
                mb-4
                h-56
                w-full
                rounded-2xl
                object-cover
              "
            />

            <p className="text-sm text-gray-400">
              {result.document}
            </p>

            <p className="mt-3 text-xs text-[#00ffae]">
              Similarity Score:
              {" "}
              {result.distance.toFixed(4)}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}