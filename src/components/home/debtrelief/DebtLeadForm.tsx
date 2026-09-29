"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

export function DebtLeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [missedEmi, setMissedEmi] = useState<"yes" | "no" | "">("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 10) {
      toast.error("Please enter your name and a valid 10-digit mobile number.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/v1/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          interest: "debt-relief",
          sourcePage: "/",
          additionalInfo: { missedEmiLast3Months: missedEmi || "not-answered" },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Request failed");

      toast.success("Thank you! Our advisor will call you shortly.");
      setName("");
      setEmail("");
      setPhone("");
      setMissedEmi("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  return (
    <section className="w-full bg-blue-50/60 py-14">
      <div className="container mx-auto grid items-center gap-10 px-6 lg:grid-cols-2">
        {/* Left: headline */}
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-blue-900 sm:text-4xl lg:text-5xl">
            Real People,
            <br />
            Real Issues,
            <br />
            <span className="text-blue-600">Real Solutions</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-slate-600">
            Missed EMIs, recovery calls and mounting interest do not have to be
            your reality. Talk to a CreditKlick advisor and get a repayment plan
            built around what you can actually afford.
          </p>
        </div>

        {/* Right: enquiry form */}
        <div className="rounded-2xl bg-white p-6 shadow-lg shadow-blue-900/5 sm:p-8">
          <h3 className="text-xl font-bold text-blue-900">Get In Touch With Us</h3>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Full Name*"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="Mobile Number*"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className={inputClass}
            />

            <fieldset>
              <legend className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Have you missed any EMI in the last 3 months?
              </legend>
              <div className="mt-3 flex gap-6">
                {(["yes", "no"] as const).map((value) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-2 text-sm font-medium capitalize text-slate-700"
                  >
                    <input
                      type="radio"
                      name="missedEmi"
                      value={value}
                      checked={missedEmi === value}
                      onChange={() => setMissedEmi(value)}
                      className="h-4 w-4 accent-blue-600"
                    />
                    {value}
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
            *We do not provide loans
            <span className="mt-1 block font-normal normal-case tracking-normal">
              We provide guidance and solutions related to debt.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
