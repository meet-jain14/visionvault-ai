"use client";

import axios from "axios";
import { useState } from "react";

export default function UploadSection() {

  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  const [preview, setPreview] =
    useState<string | null>(null);

  async function handleUpload() {

    if (!file) return;

    setLoading(true);

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    try {

      const response =
        await axios.post(
          "http://127.0.0.1:8000/api/upload",
          formData
        );

      setResult(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  }

  return (
    <section id="upload" className="scroll-mt-36 rounded-[32px] border border-white/10 bg-white/[0.03] p-8">

      <h2 className="mb-6 text-2xl font-semibold">
        Upload Image
      </h2>

      <input
        type="file"
        onChange={(e) => {

          const selectedFile =
            e.target.files?.[0] || null;
        
          setFile(selectedFile);
        
          if (selectedFile) {
        
            setPreview(
              URL.createObjectURL(
                selectedFile
              )
            );
        
          }
        
        }}
        className="mb-6 block w-full rounded-xl border border-white/10 bg-black/30 p-4 text-sm"
      />
      {preview && (

        <div className="mb-6 flex justify-center">

          <div
            className="
              inline-flex
              overflow-hidden
              rounded-[28px]
              border
              border-white/10
              bg-black/40
              p-3
            "
          >

            <img
              src={preview}
              alt="Preview"
              className="
                max-h-[420px]
                w-auto
                max-w-full
                rounded-2xl
                object-contain
              "
            />

          </div>

        </div>

      )}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="
          rounded-2xl
          bg-[#00ffae]
          px-8
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
            ? "Uploading..."
            : "Upload & Analyze"
        }
      </button>

      {result && (

        <div
          className="
            mt-8
            rounded-[28px]
            border
            border-[#00ffae]/20
            bg-[#00ffae]/[0.03]
            p-6
          "
        >

          <p
            className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-[#00ffae]
            "
          >
            AI GENERATED CAPTION
          </p>

          <h3
            className="
              mt-4
              text-2xl
              font-semibold
              leading-relaxed
            "
          >
            {result.caption}
          </h3>

        </div>

      )}

    </section>
  );
}