"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/HeroSearch";
import SearchResults from "@/components/SearchResults";
import UploadSection from "@/components/UploadSection";
import Gallery from "@/components/Gallery";
import ImageModal from "@/components/ImageModal";
import Footer from "@/components/Footer";
import { VaultImage } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";

export default function Home() {
  const [query, setQuery] = useState<string | null>(null);
  const [results, setResults] = useState<VaultImage[]>([]);
  const [selected, setSelected] = useState<VaultImage | null>(null);
  const [galleryImages, setGalleryImages] = useState<VaultImage[]>([]);
  const [searchLoading, setSearchLoading] =
  useState(false);
  // Replace with: fetch(`/api/search?query=${encodeURIComponent(q)}`)
  const handleSearch = async (
    q: string,
    file?: File
  ) => {
  
    setQuery(
      file ? file.name : q
    );
  
    try {
      setSearchLoading(true);
  
      let data;
  
      if (file) {
  
        const formData =
          new FormData();
  
        formData.append(
          "file",
          file
        );
  
        const response =
          await axios.post(
            `${API_BASE_URL}/api/search-by-image`,
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );
  
        data =
          response.data;
  
      } else {
  
        const response =
          await axios.get(
            `${API_BASE_URL}/api/search?query=${encodeURIComponent(q)}`
          );
  
        data =
          response.data;
  
      }
  
      const transformed =
        data.ids[0].map(
          (
            id: string,
            index: number
          ) => ({
  
            id,
  
            url:
              `${API_BASE_URL}/datasets/uploads/${id}`,
  
            caption:
              data.documents[0][index],
  
            similarity:
              1 -
              data.distances[0][index],
  
            width: 600,
  
            height: 800,
  
            createdAt:
              new Date().toISOString()
  
          })
        );
  
      setResults(
        transformed
      );
      setSearchLoading(false);
  
    } catch (error) {
  
      console.error(
        "Search failed:",
        error
      );
  
      setResults([]);
      setSearchLoading(false);
  
    }
  
  };

  const fetchGalleryImages = async () => {

    try {
  
      const response =
        await axios.get(
          `${API_BASE_URL}/api/images`
        );
  
      const transformed =
        response.data.map(
          (image: any) => ({
  
            id: image.filename,
  
            url:
              `${API_BASE_URL}${image.path}`,
  
            caption:
              image.caption,
  
            width: 600,
  
            height: 800,
  
            createdAt:
              new Date().toISOString()
  
          })
        );
  
      setGalleryImages(
        transformed
      );
  
    } catch (error) {
  
      console.error(
        "Failed to fetch gallery:",
        error
      );
  
    }
  
  };

  useEffect(() => {

    fetchGalleryImages();
  
  }, []);

  return (
    <main id="top">
      <Navbar />
      <HeroSearch onSearch={handleSearch} imagesIndexed={galleryImages.length} />
      <SearchResults 
        results={results}
        query={query}
        onSelect={setSelected}
        searchLoading={searchLoading}
      />
      <UploadSection
        onUploadSuccess={fetchGalleryImages}
        imagesIndexed={galleryImages.length}
      />
      <Gallery images={galleryImages} onSelect={setSelected} />
      <Footer />
      <ImageModal image={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
