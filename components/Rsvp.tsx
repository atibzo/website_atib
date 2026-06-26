"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import Reveal from "@/components/Reveal";

const { rsvp, events } = siteConfig;
const ENDPOINT = process.env.NEXT_PUBLIC_RSVP_ENDPOINT || rsvp.endpoint;

type Status = "idle" | "sending" | "sent" | "error";

/**
 * RSVP form. Submits form-encoded data to a Google Apps Script Web App
 * (NEXT_PUBLIC_RSVP_ENDPOINT) using `no-cors` — the response is opaque, so we
 * treat a non-throwing request as success. See README for the Apps Script.
 */
export default function Rsvp() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [childCount, setChildCount] = useState(0);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const ages = data
      .getAll("childAge")
      .map((v) => String(v).trim())
      .filter(Boolean);
    const params = new URLSearchParams();
    data.forEach((value, key) => {
      if (key !== "childAge") params.append(key, String(value));
    });
    params.set("childAges", ages.join(", "));
    params.set("submittedAt", new Date().toISOString());

    if (!ENDPOINT) {
      setStatus("error");
      setMessage(
        "RSVP isn’t connected yet. Set NEXT_PUBLIC_RSVP_ENDPOINT (see README)."
      );
      return;
    }

    try {
      setStatus("sending");
      await fetch(ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      setStatus("sent");
      form.reset();
      setChildCount(0);
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again or message us directly.");
    }
  }

  return (
    <section
      id="rsvp"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center"
    >
      <Reveal>
        <p className="eyebrow">{rsvp.eyebrow}</p>
        <h2 className="heading-script mx-auto mt-4 max-w-3xl">{rsvp.heading}</h2>
        <p className="mx-auto mt-4 max-w-xl font-serif text-lg italic text-ink">
          {rsvp.intro}
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-10 w-full max-w-xl">
        {status === "sent" ? (
          <div className="rounded-2xl bg-card px-8 py-12 shadow-card">
            <p className="font-display italic text-4xl text-coral">Thank you!</p>
            <p className="mt-3 font-serif text-lg text-ink">
              Your RSVP has been received. We can’t wait to celebrate with you.
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="rounded-2xl bg-card px-6 py-8 text-left shadow-card sm:px-10 sm:py-10"
          >
            <Field label="Full name" htmlFor="name">
              <input
                id="name"
                name="name"
                type="text"
                required
                className="rsvp-input"
                placeholder="Your name"
              />
            </Field>

            <Field label="Email" htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="rsvp-input"
                placeholder="you@example.com"
              />
            </Field>

            <Field label="Will you attend?" htmlFor="attending">
              <select id="attending" name="attending" className="rsvp-input" required>
                <option value="Joyfully accepts">Joyfully accepts</option>
                <option value="Regretfully declines">Regretfully declines</option>
              </select>
            </Field>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <label htmlFor="adults" className="block">
                <span className="mb-1.5 block font-sans text-xs uppercase tracking-[0.25em] text-ink-soft">
                  Adults
                </span>
                <input
                  id="adults"
                  name="adults"
                  type="number"
                  min={0}
                  max={20}
                  defaultValue={1}
                  className="rsvp-input"
                />
              </label>
              <label htmlFor="children" className="block">
                <span className="mb-1.5 block font-sans text-xs uppercase tracking-[0.25em] text-ink-soft">
                  Children
                </span>
                <input
                  id="children"
                  name="children"
                  type="number"
                  min={0}
                  max={20}
                  value={childCount}
                  onChange={(e) =>
                    setChildCount(Math.max(0, Math.min(20, Number(e.target.value) || 0)))
                  }
                  className="rsvp-input"
                />
              </label>
            </div>

            {childCount > 0 && (
              <fieldset className="mt-4">
                <legend className="mb-2 font-sans text-xs uppercase tracking-[0.25em] text-ink-soft">
                  Age of each child
                </legend>
                <div className="flex flex-wrap gap-3">
                  {Array.from({ length: childCount }).map((_, i) => (
                    <input
                      key={i}
                      name="childAge"
                      type="number"
                      min={0}
                      max={18}
                      required
                      aria-label={`Child ${i + 1} age`}
                      placeholder={`Child ${i + 1}`}
                      className="rsvp-input w-24"
                    />
                  ))}
                </div>
              </fieldset>
            )}

            <fieldset className="mt-5">
              <legend className="mb-2 font-sans text-xs uppercase tracking-[0.25em] text-ink-soft">
                Do you require stay?
              </legend>
              <div className="flex gap-6">
                {["Yes", "No"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 font-serif text-ink">
                    <input
                      type="radio"
                      name="stay"
                      value={opt}
                      defaultChecked={opt === "No"}
                      className="h-4 w-4 accent-coral"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-5">
              <legend className="mb-2 font-sans text-xs uppercase tracking-[0.25em] text-ink-soft">
                Events you’ll join
              </legend>
              <div className="flex flex-wrap gap-4">
                {events.list.map((ev) => (
                  <label
                    key={ev.name}
                    className="flex items-center gap-2 font-serif text-ink"
                  >
                    <input
                      type="checkbox"
                      name="events"
                      value={ev.name}
                      className="h-4 w-4 accent-rust"
                      defaultChecked
                    />
                    {ev.name}
                  </label>
                ))}
              </div>
            </fieldset>

            <Field label="A note for the couple (optional)" htmlFor="note">
              <textarea
                id="note"
                name="note"
                rows={3}
                className="rsvp-input resize-none"
                placeholder="Your blessings & wishes…"
              />
            </Field>

            {status === "error" && (
              <p className="mt-4 text-sm text-rust">{message}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-7 w-full rounded-full bg-coral py-3 font-sans text-base uppercase tracking-[0.25em] text-cream transition hover:bg-coral-soft disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
            >
              {status === "sending" ? "Sending…" : "Send RSVP"}
            </button>

            <p className="mt-4 text-center font-serif text-sm text-ink-soft">
              Kindly respond by {rsvp.deadline}
            </p>
          </form>
        )}
      </Reveal>

      <style jsx>{`
        :global(.rsvp-input) {
          width: 100%;
          border-radius: 0.6rem;
          border: 1px solid rgba(184, 146, 60, 0.4);
          background: #fff;
          padding: 0.65rem 0.85rem;
          font-family: var(--font-serif), Georgia, serif;
          font-size: 1rem;
          color: #5b4a42;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        :global(.rsvp-input:focus) {
          border-color: #bc5836;
          box-shadow: 0 0 0 3px rgba(188, 88, 54, 0.12);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="mt-5 block">
      <span className="mb-1.5 block font-sans text-xs uppercase tracking-[0.25em] text-ink-soft">
        {label}
      </span>
      {children}
    </label>
  );
}
