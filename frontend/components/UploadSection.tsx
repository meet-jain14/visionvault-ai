"use client";

import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { apiUrl } from "@/lib/api";

export default function UploadSection() {

  const [files, setFiles] =
    useState<File[]>([]);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  const [preview, setPreview] =
    useState<string | null>(null);

    const {

      getRootProps,
      getInputProps,
      isDragActive
    
    } = useDropzone({
    
      onDrop: (
        acceptedFiles
      ) => {
    
        setFiles(
          acceptedFiles
        );
    
      }
    
    });

  async function handleUpload() {

    if (!files.length) return;

    setLoading(true);

    const formData = new FormData();

    files.forEach((file) => {

      formData.append(
        "files",
        file
      );
    
    });

    try {

      const response =
        await axios.post(
          apiUrl("/api/upload"),
          formData
        );

      setResult(response.data);
      console.log(response.data);

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

      <div
        {...getRootProps()}
        className={`
          mt-6
          flex
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          border-dashed
          p-12
          text-center
          transition-all
          duration-300

          ${
            isDragActive

            ? "border-[#00ffae] bg-[#00ffae]/10"

            : "border-white/10 bg-white/[0.03]"
          }
        `}
      >

        <input
          {...getInputProps()}
        />

        <p
          className="
            text-lg
            font-medium
            text-white
          "
        >
          Drag & drop images here
        </p>

        <p
          className="
            mt-2
            text-sm
            text-gray-400
          "
        >
          or click to browse folders
        </p>

        {

          files.length > 0 && (

            <p
              className="
                mt-6
                text-sm
                text-[#00ffae]
              "
            >
              {files.length}
              {" "}
              image(s) selected
            </p>

          )

        }

      </div>
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
            ? "Analyzing Images..."
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
