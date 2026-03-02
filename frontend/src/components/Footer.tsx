import { FaXTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { Zalando_Sans_Expanded } from "next/font/google";

const zalando = Zalando_Sans_Expanded({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});


export default function Footer() {
  return (
    <footer className="bg-[#F8F9FA] border-t border-gray-300">
      <div
        className="
          max-w-7xl mx-auto
          px-6 py-6 flex flex-col sm:flex-row items-center
          sm:justify-between
          gap-4
        "
      >
        <p className={`text-lg font-bold text-gray-900 tracking-wide ${zalando.className}`}>
          SILVERTRACK
        </p>

        <div className="flex text-center items-center gap-4">
          <span className="text-xs uppercase tracking-widest text-gray-500">
            Developer's Socials
          </span>

          <div className="flex items-center gap-4">
            <a
              href="https://x.com/iONE_08"
              aria-label="Twitter / X"
              className="text-gray-500 hover:text-gray-900 transition-colors"
              target="_blank"
            >
              <FaXTwitter size={18} />
            </a>

            <a
              href="https://www.instagram.com/balaji_nadar_08/"
              aria-label="Instagram"
              className="text-gray-500 hover:text-gray-900 transition-colors"
              target="_blank"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/balaji-nadar-828b41354/"
              aria-label="LinkedIn"
              className="text-gray-500 hover:text-gray-900 transition-colors"
              target="_blank"
            >
              <FaLinkedinIn size={18} />
            </a>

            <a
              href="https://github.com/balajiNadar08"
              aria-label="Github"
              className="text-gray-500 hover:text-gray-900 transition-colors"
              target="_blank"
            >
              <FaGithub size={18} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="text-center text-xs text-gray-500 pb-4">
        © {new Date().getFullYear()} SILVERTRACK. All rights reserved.
      </div>
    </footer>
  );
}
