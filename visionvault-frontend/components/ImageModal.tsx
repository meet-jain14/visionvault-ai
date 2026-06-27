"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { VaultImage } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";

export default function ImageModal({
  image,
  onClose,
}: {
  image: VaultImage | null;
  onClose: () => void;
}) 
{
  const handleDownload = () => {

    if (!image) return;
  
    const link =
      document.createElement("a");
  
    link.href =
      `${API_BASE_URL}/api/download/${encodeURIComponent(image.id)}`;
  
    document.body.appendChild(link);
  
    link.click();
  
    document.body.removeChild(link);
  
  };
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-5"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full max-h-[85vh] rounded-md overflow-hidden bg-surface border border-line flex flex-col"
          >
            <div className="flex-1 min-h-0 flex items-center justify-center bg-bg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.caption}
                className="max-h-[60vh] w-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-line">
              <div>
                <p className="text-[13px] text-ink">{image.caption}</p>
                {typeof image.similarity === "number" && (
                  <p className="text-[11px] font-mono text-inkdim mt-1">
                    {Math.round(image.similarity * 100)}% match
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 rounded-full bg-accent text-bg px-3 py-1.5 text-[12px] font-medium hover:opacity-90 transition-opacity"
                  >
                  <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Download
                </button>
                <button
                  onClick={onClose}
                  aria-label="Close preview"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-inkdim hover:text-ink transition-colors"
                >
                  <X className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
