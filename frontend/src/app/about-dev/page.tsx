import { Zalando_Sans_Expanded } from "next/font/google";

const zalando = Zalando_Sans_Expanded({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const page = () => {
  return (
    <div
      className={`w-full flex bg-[#F8F9FA] ${zalando.className} text-center`}
    >
      <div className="flex flex-col">
        <p className={`w-full text-xl ${zalando.className}`}>
          Hi, I'm <span>Balaji</span>, the developer behind{" "}
          <span>SILVERTRACK</span>. I'm a full-stack web developer who enjoys
          building techy things, mostly software… though I maintain a
          complicated, soul-crushing, emotionally taxing relationship with
          hardware. Hardware projects have a rare gift for humbling me,
          questioning my life & financial choices, and occasionally reducing me
          to staring at a breadboard in silence.
        </p>
        <p className={`w-full text-xl ${zalando.className}`}>
          {" "}
          Like most of my projects, SILVERTRACK wasn't born from a grand startup
          vision or a pitch-deck fever dream. It began the usual way:{" "}
          <i>“I want to learn this”</i>, followed closely by{" "}
          <i>“I wish something like this already existed”</i>, even when it
          already did, because clearly it lacked my Salt Bae type finish. So
          naturally, I built it myself.
        </p>
        <p className={`w-full text-xl ${zalando.className}`}>
          {" "}
          So don't feel shy about criticizing this project the way my parents
          criticize my marks as I've reached a rare state of calm and
          acceptance. Feedback no longer hurts, it merely builds character.{" "}
        </p>
        <p className={`w-full text-xl ${zalando.className}`}>
          {" "}
          <i>
            “The universe chooses to treat some people like they're masochistic,
          </i>
          even when they are not.” — Balaji
        </p>
      </div>
    </div>
  );
};

export default page;
