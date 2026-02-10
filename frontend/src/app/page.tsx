import { Zalando_Sans_Expanded } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const zalando = Zalando_Sans_Expanded({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function Home() {
  return (
    <div className={`min-h-screen bg-[#F8F9FA] ${zalando.className}`}>
      <Navbar />

      <main className="relative h-[calc(100vh-64px)]">
        <div
          className=" absolute inset-0 grid grid-cols-4 grid-rows-8
          sm:grid-cols-8 sm:grid-rows-6
          lg:grid-cols-12 lg:grid-rows-6
        "
        >
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="border-r border-b border-gray-300" />
          ))}
        </div>

        <div
          className=" relative h-full grid grid-cols-4
          sm:grid-cols-8
          lg:grid-cols-12
          grid-rows-8
          sm:grid-rows-6
          lg:grid-rows-6
          px-6
        "
        >
          <div
            className="
            col-start-1 col-span-4 row-start-2 row-span-3
            sm:col-start-2 sm:col-span-6 sm:row-start-2
            lg:col-start-3 lg:col-span-6 lg:row-start-2
            flex flex-col justify-center
          "
          >
            <div className="relative bg-[#F8F9FA] px-6 py-5 rounded-md">
              <div className=" absolute left-4 bottom-14 h-4 w-[70%] bg-gray-300 opacity-70 -z-10" />

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                SILVERTRACK
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl">
                SILVERTRACK keeps your personal movie history neatly remembered.
                Because great movie deserves to be remembered.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
