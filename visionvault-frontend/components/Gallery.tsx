"use client";

import { motion } from "framer-motion";
import { VaultImage } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";

export default function Gallery({
  images,
  onSelect,
}: {
  images: VaultImage[];
  onSelect: (img: VaultImage) => void;
}) {
  // split into columns for a masonry effect without a heavy layout library
  
  const columns: VaultImage[][] = [[], [], [], []];
  images.forEach((img, i) => columns[i % 4].push(img));

  return (
    <section id="gallery" className="px-5 py-20 border-t border-line">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <p className="text-[12px] font-mono uppercase tracking-[0.18em] text-inkdim mb-3">
              Gallery
            </p>
            <h2 className="text-[24px] font-medium tracking-tight">Everything in the vault</h2>
          </div>
          <span className="text-[12px] font-mono text-inkdim hidden sm:inline">
            {images.length} images
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {columns.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-4">
              {col.map((img, i) => (
                <motion.button
                  key={img.id}
                  onClick={() => onSelect(img)}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  className="group relative overflow-hidden rounded-md bg-surface text-left"
                  style={{ aspectRatio: `${img.width} / ${img.height}` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-[11px] text-ink leading-snug line-clamp-2">{img.caption}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
