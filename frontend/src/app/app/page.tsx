import { Zalando_Sans_Expanded, Lato } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className={`w-full  ${zalando.className}`}>
      <div className="max-w-3xl mx-auto py-10 px-6">
        <div className="flex gap-4">
          <Input type="search" placeholder="Search any movie..." />
          <Button className="cursor-pointer">Search</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
