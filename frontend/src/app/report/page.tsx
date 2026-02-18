"use client";

import { Zalando_Sans_Expanded, Lato } from "next/font/google";
import { useState, FormEvent } from "react";

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
  const [feedbackType, setFeedbackType] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("https://formspree.io/f/xvzbqrok", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          feedbackType,
          subject,
          description,
          email,
        }).toString(),
      });

      if (res.ok) {
        setStatus("success");
        setFeedbackType("");
        setSubject("");
        setDescription("");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${zalando.className} min-h-screen bg-[#F8F9FA] text-gray-900 flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20`}
    >
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Share Your Feedback
          </h1>

          <div
            className={`mt-4 text-gray-600 text-sm sm:text-base leading-relaxed ${lato.className}`}
          >
            <p>Let's improve this website together.</p>
            <p>Your ideas help shape the next version.</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-white border border-neutral-300 p-6 sm:p-10 rounded-3xl shadow-xl"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wide">
              Type of feedback
            </label>
            <select
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              className="bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
              required
            >
              <option value="" disabled>
                Select...
              </option>
              <option value="bug_report">Bug Report</option>
              <option value="suggestion">Suggestion</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wide">
              Subject
            </label>
            <input
              type="text"
              placeholder="e.g. Movie search not working"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wide">
              Description
            </label>

            <textarea
              rows={5}
              placeholder="Please provide as much detail as possible..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold tracking-wide">
              Your Email (optional)
            </label>
            <input
              type="email"
              placeholder="So we can follow up..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white font-semibold py-3 rounded-xl text-sm sm:text-base hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>

          {status === "success" && (
            <p className="text-green-600 text-sm text-center">
              Feedback sent successfully. Thank you!
            </p>
          )}

          {status === "error" && (
            <p className="text-red-600 text-sm text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Page;
