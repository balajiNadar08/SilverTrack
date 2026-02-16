import { Zalando_Sans_Expanded, Lato } from "next/font/google";
import Image from "next/image";

const zalando = Zalando_Sans_Expanded({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

const page = () => {
  return (
    <div className={`w-full bg-[#F8F9FA] ${lato.className}`}>
      <div className="max-w-3xl mx-auto py-14 px-6">
        
        <h1 className={`text-3xl sm:text-4xl font-bold mb-12 text-gray-900 ${zalando.className}`}>
          About the Developer
        </h1>

        <div className="relative w-full h-96 mb-8">
          <Image
            src="/assets/dev-img.webp"
            alt="Developer"
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        <div className="flex flex-col gap-8 text-gray-700 leading-relaxed text-lg sm:text-xl">
          
          <p>
            Hi, I'm{" "}
            <span className={`${zalando.className} font-semibold text-gray-900`}>
              Balaji
            </span>
            , the developer behind{" "}
            <span className={`${zalando.className} font-semibold text-gray-900`}>
              SILVERTRACK
            </span>
            . I'm a full-stack web developer who enjoys building techy things,
            mostly software… though I maintain a complicated, soul-crushing,
            emotionally taxing relationship with hardware. Hardware projects
            have a rare gift for humbling me, questioning my life & financial
            choices and occasionally making me just stare at a breadboard in
            silence.
          </p>

          <p>
            Like most of my projects, SILVERTRACK wasn't born from a grand
            startup vision or a pitch-deck fever dream. It began the usual way:{" "}
            <span className="italic text-gray-900">
              “I want to learn this”
            </span>
            , followed closely by{" "}
            <span className="italic text-gray-900">
              “I wish something like this already existed”
            </span>
            , even when it already did, because clearly it lacked my Salt Bae
            type finish. So, I built it myself.
          </p>

          <p>
            So don't feel shy about criticizing this project the way my parents
            criticize my marks as I've reached a rare state of calm and
            acceptance. Feedback no longer hurts, it merely builds character.
          </p>

          <div className="pt-6 border-t border-gray-300">
            <p
              className={`italic text-xl sm:text-2xl text-gray-900 ${zalando.className}`}
            >
              “The universe chooses to treat some people like they're masochist,
              even though they are not.”
            </p>
            <p className="mt-3 text-gray-600">— Balaji</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default page;
