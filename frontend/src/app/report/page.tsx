"use client";

import { Zalando_Sans_Expanded, Lato } from "next/font/google";

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

const Page = () => {
  return (
    <div
      className={`${zalando.className} min-h-screen bg-[#F8F9FA] text-gray-900 flex flex-col items-center px-6 py-16`}
    >
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Share Your Feedback
        </h1>

        <div className={`text-center text-gray-700 mb-10 ${lato.className}`}>
          <p>Let's improve this website together :)</p>
          <p>You can share feedback and I'll do the rest.</p>
        </div>

        <form className="space-y-6 bg-[#F8F9FA] border-2 p-8 rounded-2xl border-neutral-800 shadow-lg">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-900">Type of feedback</label>
            <select className="bg-[#F8F9FA] text-gray-900 border-2 border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white">
              <option>Select...</option>
              <option>Bug Report</option>
              <option>Suggestion for improvement</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-900">Subject</label>
            <input
              type="text"
              placeholder="e.g. Movie search not working"
              className="bg-[#F8F9FA] text-gray-900 border-2 border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-900">
              Your Email (optional)
            </label>
            <input
              type="email"
              placeholder="So we can discuss more about your feedback. I won't annoy you ;)"
              className="bg-[#F8F9FA] text-gray-900 border-2 border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white border-2 font-semibold py-2 rounded-lg cursor-pointer hover:bg-neutral-200 hover:text-gray-900 hover:border-gray-900 transition-all duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
