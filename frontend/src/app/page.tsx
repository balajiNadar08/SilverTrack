import { Zalando_Sans_Expanded } from "next/font/google";
import Navbar from "@/components/Navbar";

const zalando = Zalando_Sans_Expanded({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function Home() {
  return (
    <div className="bg-[#F8F9FA]">
      <Navbar />
      <div>
        
      </div>
    </div>
  );
}
