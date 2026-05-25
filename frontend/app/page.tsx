import UploadSection from "@/components/UploadSection";
import GallerySection from "@/components/GallerySection";
import SearchSection from "@/components/SearchSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 pt-36 pb-20">

        <div id="hero" className="mb-16 scroll-mt-36">
          

          <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            AI-powered image intelligence
            and semantic retrieval platform.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-400">
            Upload, analyze, caption, and search images
            using multimodal AI embeddings and semantic retrieval.
          </p>

        </div>
          <div className="mt-16">
            <UploadSection />
          </div>
          <SearchSection />
          <GallerySection />

      </div>
      <Footer />
    </main>
    </>
  );
}