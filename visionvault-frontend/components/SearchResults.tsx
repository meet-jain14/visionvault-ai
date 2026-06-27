"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { VaultImage } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";

function ApertureScore({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const r = 9;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-1.5">
      <svg width="22" height="22" viewBox="0 0 22 22" className="-rotate-90">
        <circle cx="11" cy="11" r={r} fill="none" stroke="var(--line)" strokeWidth="2" />
        <circle
          cx="11"
          cy="11"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (pct / 100) * c}
        />
      </svg>
      <span className="font-mono text-[11px] text-inkdim">{pct}%</span>
    </div>
  );
}

export default function SearchResults({
  results,
  query,
  onSelect,
  searchLoading,
}: {
  results: VaultImage[];
  query: string | null;
  onSelect: (img: VaultImage) => void;
  searchLoading: boolean;
}) {
  const handleDownload = (
    e: React.MouseEvent,
    image: VaultImage
  ) => {
  
    e.stopPropagation();
  
    const link = document.createElement("a");
  
    link.href =
      `${API_BASE_URL}/api/download/${encodeURIComponent(image.id)}`;

    link.download = image.id;
  
    document.body.appendChild(link);
  
    link.click();
  
    document.body.removeChild(link);
  
  };
  if (!query) return null;

  return (
    <section className="px-5 pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline justify-between mb-6 border-b border-line pb-4">
          <h2 className="text-[15px] text-ink">
            Results for <span className="font-mono text-accent">&ldquo;{query}&rdquo;</span>
          </h2>
          <span className="text-[12px] font-mono text-inkdim">{results.length} matches</span>
        </div>

        {searchLoading ? (

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">

            {Array.from({ length: 5 }).map((_, i) => (

              <div
                key={i}
                className="animate-pulse"
              >

                <div className="aspect-[4/5] rounded-md bg-surface2" />

                <div className="mt-3 h-3 rounded bg-surface2" />

                <div className="mt-2 h-3 w-2/3 rounded bg-surface2" />

              </div>

            ))}

          </div>

          ) : results.length === 0 ? (

          <div className="py-16 text-center text-[13px] text-inkdim">
            No matches above the relevance threshold. Try a broader description.
          </div>

          ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {results.map((img, i) => (
              <motion.div
                key={img.id}
                onClick={() => onSelect(img)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="group text-left"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleDownload(e, img)}
                      aria-label="Download image"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-bg/80 text-ink hover:bg-accent hover:text-bg transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex items-start justify-between gap-2">
                  <p className="text-[12px] text-inkdim leading-snug line-clamp-2">{img.caption}</p>
                  {typeof img.similarity === "number" && <ApertureScore value={img.similarity} />}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
