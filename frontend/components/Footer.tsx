export default function Footer() {

    return (
  
      <footer
        className="
          mt-32
          border-t
          border-white/10
        "
      >
  
        <div
          className="
            mx-auto
            flex
            max-w-[92%]
            items-center
            justify-between
            py-8
          "
        >
  
          <div>
  
            <h3
              className="
                text-lg
                font-semibold
                text-[#00ffae]
              "
            >
              VisionVault AI
            </h3>
  
            <p
              className="
                mt-2
                text-sm
                text-gray-400
              "
            >
              Semantic image intelligence platform.
            </p>
  
          </div>
  
          <div
            className="
              flex
              items-center
              text-sm
              text-gray-400
            "
          >

            <a
              href="https://github.com/meet-jain14/visionvault-ai.git"
              target="_blank"
              className="
                transition-colors
                duration-300
                hover:text-[#00ffae]
              "
            >
              GitHub
            </a>

            <span
              className="
                mx-3
                text-white/20
              "
            >
              |
            </span>

            <a
              href="https://www.linkedin.com/in/meet-jain-b32164325"
              target="_blank"
              className="
                transition-colors
                duration-300
                hover:text-[#00ffae]
              "
            >
              Meet Jain
            </a>

          </div>
  
        </div>
  
      </footer>
  
    );
  }