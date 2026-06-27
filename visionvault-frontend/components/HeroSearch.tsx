"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ImagePlus, ArrowRight, X } from "lucide-react";

type Mode = "text" | "image";

export default function HeroSearch({
  onSearch,
  imagesIndexed,
}: {
  onSearch: (
    query: string,
    file?: File
  ) => void;
  imagesIndexed: number;
}) {
  const [mode, setMode] = useState<Mode>("text");
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [previewName, setPreviewName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (
    e: React.FormEvent
  ) => {
  
    e.preventDefault();
  
    if (
      mode === "text" &&
      query.trim()
    ) {
  
      onSearch(
        query.trim()
      );
  
    }
  
    if (
      mode === "image" &&
      selectedFile
    ) {
  
      onSearch(
        "",
        selectedFile
      );
  
    }
  
  };

  return (
    <section id="search" className="relative pt-40 pb-20 px-5">
      {/* ambient aperture rings, quiet, not a gradient blob */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10">
        <div className="h-[420px] w-[420px] rounded-full border border-line/60" />
        <div className="absolute h-[300px] w-[300px] rounded-full border border-line/40" />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[12px] font-mono uppercase tracking-[0.18em] text-inkdim mb-4">
          Semantic image search
        </p>
        <h1 className="text-[34px] sm:text-[44px] font-medium tracking-tight leading-[1.1] text-ink mb-10">
          Search images by meaning,
          <br />
          not filenames.
        </h1>

        <form onSubmit={handleSubmit} className="w-full">
          <div
            data-active={focused}
            className="aperture-ring flex items-center gap-3 bg-surface px-5 py-4 mb-3"
          >
            <div className="flex shrink-0 rounded-full bg-surface2 p-0.5">
              <button
                type="button"
                onClick={() => setMode("text")}
                className={`px-3 py-1.5 rounded-full text-[12px] transition-colors ${
                  mode === "text" ? "bg-accent text-bg" : "text-inkdim hover:text-ink"
                }`}
              >
                Text
              </button>
              <button
                type="button"
                onClick={() => setMode("image")}
                className={`px-3 py-1.5 rounded-full text-[12px] transition-colors ${
                  mode === "image" ? "bg-accent text-bg" : "text-inkdim hover:text-ink"
                }`}
              >
                Image
              </button>
            </div>

            <div className="h-5 w-px bg-line shrink-0" />

            {mode === "text" ? (
              <>
                <Search className="h-4 w-4 text-inkdim shrink-0" strokeWidth={1.75} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Search a text to look for"
                  className="flex-1 bg-transparent outline-none text-[15px] text-ink placeholder:text-inkdim/70"
                />
              </>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex flex-1 items-center gap-2 text-left text-[15px] text-inkdim hover:text-ink transition-colors"
              >
                <ImagePlus className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                {previewName ?? "Choose an image to match"}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {

                    const file =
                      e.target.files?.[0];
                  
                    if (!file) return;
                  
                    setSelectedFile(file);
                  
                    setPreviewName(file.name);
                  
                  }}
                />
              </button>
            )}

            <button
              type="submit"
              aria-label="Run search"
              className="shrink-0 flex items-center justify-center h-9 w-9 rounded-full bg-accent text-bg hover:opacity-90 transition-opacity"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          <AnimatePresence>
            {mode === "image" && previewName && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] text-inkdim"
              >
                {previewName}
                <button
                  type="button"
                  onClick={() => setPreviewName(null)}
                  aria-label="Remove image"
                  className="hover:text-ink"
                >
                  <X className="h-3 w-3" strokeWidth={2} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <p className="mt-5 text-[12px] text-inkdim">
          <span className="font-medium text-ink">
            {imagesIndexed}
          </span>{" "}
          AI-indexed image{imagesIndexed !== 1 ? "s" : ""} • OpenCLIP embeddings ready
        </p>
      </div>
    </section>
  );
}
