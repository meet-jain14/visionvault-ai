"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileImage, CheckCircle2 } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

type UploadItem = { name: string; progress: number; status: string; };

export default function UploadSection({
  onUploadSuccess,
  imagesIndexed,
}: {
  onUploadSuccess: () => void;
  imagesIndexed: number;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [items, setItems] = useState<UploadItem[]>([]);
  const [showToast, setShowToast] =
  useState(false);
  const [uploadedCount, setUploadedCount] =
    useState(0);

  const simulateUpload = useCallback(
    async (files: File[]) => {
  
      const next = files.map(
        (f) => ({
          name: f.name,
          progress: 0,
          status: "Uploading...",
        })
      );
  
      setItems(
        (prev) => [...prev, ...next]
      );
  
      try {
  
        const formData =
          new FormData();
  
        files.forEach(
          (file) => {
            formData.append(
              "files",
              file
            );
          }
        );
  
        await axios.post(
          `${API_BASE_URL}/api/upload`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
  
        setItems(
          (prev) =>
            prev.map((item) => {
        
              if (
                !files.some(
                  (file) =>
                    file.name === item.name
                )
              ) {
                return item;
              }
        
              return {
        
                ...item,
        
                progress: 35,
        
                status: "Generating AI caption..."
        
              };
        
            })
        );
        
        await new Promise((resolve) =>
          setTimeout(resolve, 350)
        );
        setItems(
          (prev) =>
            prev.map((item) => {
                if (
                  !files.some(
                    (file) =>
                      file.name === item.name
                  )
                ) {
                  return item;
                }
          
                return {
                ...item,
                progress: 65,
                status: "Creating CLIP embeddings..."
                };
              })
        );
        
        await new Promise((resolve) =>
          setTimeout(resolve, 350)
        );
        
        setItems(
          (prev) =>
            prev.map(
              (item) => {
                if (
                  !files.some(
                    (file) =>
                      file.name === item.name
                  )
                ) {
                  return item;
                }
          
                return {
                ...item,
                progress: 90,
                status: "Indexing in ChromaDB..."
                };
              })
            
        );
        
        await new Promise((resolve) =>
          setTimeout(resolve, 350)
        );
        setItems(
          (prev) =>
            prev.map(
              (item) => {
                if (
                  !files.some(
                    (file) =>
                      file.name === item.name
                  )
                ) {
                  return item;
                }
          
                return {
                ...item,
                progress: 100,
                status: "Successfully indexed ✓"
              };
              })
            
        );
        setUploadedCount(files.length);

        setShowToast(true);

        setTimeout(() => {

          setShowToast(false);

        }, 3000);
        onUploadSuccess();
  
      } catch (error) {
  
        console.error(
          "Upload failed:",
          error
        );
  
      }
  
    },
    []
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    simulateUpload(Array.from(e.dataTransfer.files));
  };

  return (
    <section id="upload" className="px-5 py-20 border-t border-line">
      <div className="mx-auto max-w-6xl grid md:grid-cols-[1fr_320px] gap-10">
        <div>
          <p className="text-[12px] font-mono uppercase tracking-[0.18em] text-inkdim mb-3">
            Dataset
          </p>
          <h2 className="text-[24px] font-medium tracking-tight mb-6">Add images to your vault</h2>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={`flex flex-col items-center justify-center gap-3 rounded-md border border-dashed py-14 px-6 text-center transition-colors ${
              dragOver ? "border-accent bg-accent/[0.04]" : "border-line bg-surface"
            }`}
          >
            <UploadCloud className="h-5 w-5 text-inkdim" strokeWidth={1.5} />
            <p className="text-[13px] text-ink">Drop images here</p>
            <p className="text-[12px] text-inkdim">JPG, PNG, WebP — up to 25MB each</p>
            <label className="mt-1 cursor-pointer text-[12px] font-medium text-accent hover:opacity-80">
              Browse files
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => simulateUpload(Array.from(e.target.files ?? []))}
              />
            </label>
          </div>

          <AnimatePresence>
            {items.length > 0 && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 space-y-2"
              >
                {items.map((item) => (
                  <li
                  key={item.name}
                  className="rounded-md border border-line bg-surface p-4"
                >
                  <div className="flex items-center gap-3">
                    <FileImage
                      className="h-4 w-4 text-inkdim shrink-0"
                      strokeWidth={1.75}
                    />
                
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-[13px] text-ink font-medium">
                        {item.name}
                      </p>
                
                      <p className="mt-1 text-[11px] text-inkdim">
                        {item.status}
                      </p>
                    </div>
                
                    <span className="text-[11px] font-mono text-inkdim">
                      {item.progress}%
                    </span>
                
                    {item.progress >= 100 && (
                      <CheckCircle2
                        className="h-4 w-4 text-accent"
                        strokeWidth={1.75}
                      />
                    )}
                  </div>
                
                  <div className="mt-3 h-1.5 rounded-full bg-surface2 overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-300"
                      style={{
                        width: `${item.progress}%`,
                      }}
                    />
                  </div>
                </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="rounded-md border border-line bg-surface p-5 h-fit">
          <p className="text-[12px] font-mono uppercase tracking-[0.18em] text-inkdim mb-4">
            Status
          </p>
          <dl className="space-y-3">
            {[
              ["Images Indexed", imagesIndexed.toString()],
              ["Caption Model", "BLIP"],
              ["Embedding Model", "OpenCLIP"],
              ["Vector Database", "ChromaDB"],
              ["Semantic Search", "Online"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <dt className="text-[12px] text-inkdim">{label}</dt>
                <dd className="font-mono text-[12px] text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      {showToast && (
      <motion.div
        initial={{
          opacity: 0,
          y: -20,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: -20,
          scale: 0.95,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          fixed
          top-6
          right-6
          z-50
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-accent
          bg-surface
          px-5
          py-4
          shadow-2xl
          backdrop-blur-xl
        "
      >
        <CheckCircle2
          className="h-5 w-5 text-accent"
          strokeWidth={2}
        />

        <div>
          <p className="text-sm font-semibold text-white">
            Upload Complete
          </p>

          <p className="text-xs text-zinc-400">
            {uploadedCount} image{uploadedCount > 1 ? "s" : ""} indexed successfully
          </p>
        </div>
      </motion.div>
    )}
    </section>
  );
}
