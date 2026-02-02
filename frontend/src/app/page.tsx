import { Zalando_Sans_Expanded } from "next/font/google";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const zalando = Zalando_Sans_Expanded({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className={`text-4xl font-bold ${zalando.className}`}>SilverTrack</h1>

      <Field className={`w-3xl mt-12 ${zalando.className}`}>
        <FieldLabel htmlFor="input-field-username">Search</FieldLabel>
        <div className="flex">
          <Input
            id="input-field-username"
            type="text"
            placeholder="Search any movie..."
            className="border-0"
          />
          <Button className="cursor-pointer" variant="outline" size="icon">
            <Search />
          </Button>
        </div>

        <FieldDescription>...</FieldDescription>
      </Field>
    </div>
  );
}
