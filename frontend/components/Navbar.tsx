export default function Navbar() {

    return (
  
      <header
        className="
           fixed
            left-1/2
            top-6
            z-50
            flex
            w-full
            max-w-7xl
            px-6
            -translate-x-1/2
            items-center
            justify-between
            rounded-full
            border
            border-white/10
            bg-black/30
            px-8
            py-4
            shadow-2xl
            backdrop-blur-xl
        "
      >
  
        <a
        href="#hero"
        className="
            text-sm
            font-semibold
            uppercase
            tracking-[0.3em]
            text-[#00ffae]
            transition-opacity
            duration-300
            hover:opacity-80
        "
        >
        VisionVault AI
        </a>
  
        <nav
          className="
            hidden
            items-center
            gap-6
            md:flex
          "
        >
  
          <a
            href="#upload"
            className="
              text-sm
              text-gray-300
              transition-colors
              duration-300
              hover:text-[#00ffae]
            "
          >
            Upload
          </a>
  
          <a
            href="#search"
            className="
              text-sm
              text-gray-300
              transition-colors
              duration-300
              hover:text-[#00ffae]
            "
          >
            Search
          </a>
  
          <a
            href="#gallery"
            className="
              text-sm
              text-gray-300
              transition-colors
              duration-300
              hover:text-[#00ffae]
            "
          >
            Gallery
          </a>
  
          <a
            href="https://github.com/meet-jain14/visionvault-ai.git"
            target="_blank"
            className="
              rounded-full
              border
              border-white/10
              px-4
              py-2
              text-sm
              transition-all
              duration-300
              hover:border-[#00ffae]/30
              hover:bg-[#00ffae]/10
            "
          >
            GitHub
          </a>
  
        </nav>
  
      </header>
  
    );
  }