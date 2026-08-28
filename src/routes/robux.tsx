import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronDown,
  CloseIcon,
  GamepadIcon,
  PlusPerkIcon,
  RobuxIcon,
  SendIcon,
  TagIcon,
  VerifiedIcon,
} from "@/components/rbx-icons";
import crown from "@/assets/crown.jpg.asset.json";

export const Route = createFileRoute("/robux")({
  head: () => ({
    meta: [
      { title: "Buy Robux — Packages, Plus & Gift Cards" },
      {
        name: "description",
        content:
          "Limited-time avatar items, Robux packages, subscription perks, gift cards and answers to common Robux questions.",
      },
      { property: "og:title", content: "Buy Robux — Packages, Plus & Gift Cards" },
      {
        property: "og:description",
        content: "Limited-time avatar items, Robux packages, subscriptions and gift cards.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BuyRobux;
});

const packages = [
  { amount: "10,000", price: "₱6,800.00" },
  { amount: "4,500", price: "₱3,400.00" },
  { amount: "3,150", price: "₱1,990.00" },
  { amount: "1,700", price: "₱1,360.00" },
  { amount: "1,200", price: "₱799.00" },
  { amount: "800", price: "₱680.00" },
  { amount: "400", price: "₱350.00" },
  { amount: "80", price: "₱70.00", forYou: true },
  { amount: "40", price: "₱35.00" },
];

const faqs = ["What are Robux?", "Where are my Robux?", "Do Robux expire?"];

function BuyRobux() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="rbx-grid min-h-screen pb-16">
      <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur">
        <div className="px-5 pt-4">
          <Link to="/" aria-label="Close">
            <CloseIcon className="h-8 w-8 text-muted-foreground" />
          </Link>
        </div>
        <div className="mt-2 flex items-center justify-between border-b border-border/50 px-5 py-3">
          <div className="flex flex-1 items-center justify-center gap-2 text-xl font-bold">
            <RobuxIcon className="h-6 w-6" />7
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-pill px-4 py-2.5 text-[15px] font-semibold">
            <SendIcon className="h-5 w-5" />
            Send
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-md px-5">
        <h1 className="pt-8 text-[44px] leading-none font-extrabold tracking-tight">Buy Robux</h1>

        <section className="pt-9">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Limited-time avatar items</h2>
            <span className="shrink-0 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background">
              4 days left
            </span>
          </div>
          <article className="mt-4 overflow-hidden rounded-2xl border border-border/60 bg-card/60">
            <img src={crown.url} alt="Gold Crown of Ozymandias" className="w-full object-cover" />
            <div className="px-5 pb-5">
              <h3 className="text-[17px] font-bold">Gold Crown of Ozymandias</h3>
              <p className="mt-1 flex items-center gap-1.5 text-[15px] text-muted-foreground">
                Roblox <VerifiedIcon className="h-5 w-5" />
              </p>
            </div>
            <div className="flex items-center justify-between bg-secondary/70 px-5 py-4">
              <span className="flex items-center gap-2 text-lg font-bold">
                <RobuxIcon className="h-6 w-6" />
                22,500
              </span>
              <span className="rounded-lg bg-pill px-6 py-3 text-[15px] font-semibold">₱13.6K</span>
            </div>
          </article>
        </section>

        <section className="pt-10">
          <h2 className="text-2xl font-bold">Robux packages</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            By purchasing Robux, you agree to our{" "}
            <span className="font-semibold text-foreground">Terms of Use</span>, including the
            arbitration clause and revocation policy.
          </p>
          <ul className="mt-4 divide-y divide-border/30 rounded-2xl border border-border/60 px-5">
            {packages.map((p) => (
              <li key={p.amount} className="flex items-center justify-between py-4">
                <span className="flex items-center gap-3 text-lg font-bold">
                  <RobuxIcon className="h-6 w-6" />
                  {p.amount}
                  {p.forYou && (
                    <span className="rounded-full bg-pill px-3 py-1.5 text-[13px] font-semibold">
                      ★ For you
                    </span>
                  )}
                </span>
                <span
                  className={`min-w-[120px] rounded-lg px-5 py-3 text-center text-[15px] font-semibold ${
                    p.forYou ? "bg-primary text-primary-foreground" : "bg-pill"
                  }`}
                >
                  {p.price}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="pt-10">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <PlusPerkIcon className="h-8 w-8" />
              New on Roblox
            </h2>
            <span className="text-[15px] underline">Learn more</span>
          </div>
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none]">
            {["Roblox Plus", "Roblox Premium"].map((name) => (
              <article
                key={name}
                className="w-[84%] shrink-0 rounded-2xl border border-border/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <span className="font-bold">₱350.00</span>
                </div>
                <ul className="mt-4 space-y-4 text-[15px] text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <TagIcon className="h-6 w-6 shrink-0 text-foreground" />
                    10% off in-game items, avatars, and more
                  </li>
                  <li className="flex items-center gap-3">
                    <GamepadIcon className="h-6 w-6 shrink-0 text-foreground" />
                    Free private servers
                  </li>
                  <li className="flex items-center gap-3">
                    <RobuxIcon className="h-6 w-6 shrink-0 text-foreground" />
                    Send Robux for free
                  </li>
                </ul>
                <div className="mt-5 rounded-xl bg-pill py-4 text-center font-semibold">
                  ₱350.00/month
                </div>
              </article>
            ))}
          </div>
          <div className="flex justify-center gap-2 pt-1">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${i === 0 ? "bg-muted-foreground" : "bg-border"}`}
              />
            ))}
          </div>
        </section>

        <section className="pt-10">
          <h2 className="text-2xl font-bold">More ways to get Robux</h2>
          <article className="mt-4 rounded-2xl border border-border/60 p-6">
            <h3 className="text-2xl font-bold">Gift Card</h3>
            <p className="mt-2 text-[15px] text-muted-foreground">
              Enjoy 25% more Robux on Roblox gift cards
            </p>
            <div className="mt-5 rounded-xl bg-pill py-4 text-center font-semibold">Buy</div>
          </article>
        </section>

        <section className="pt-10 pb-10">
          <h2 className="text-2xl font-bold">FAQ</h2>
          <div className="mt-4 space-y-4">
            {faqs.map((q) => (
              <div key={q} className="rounded-2xl border border-border/60">
                <button
                  onClick={() => setOpen(open === q ? null : q)}
                  className="flex w-full items-center justify-between px-5 py-6 text-left text-[15px] font-bold"
                >
                  {q}
                  <ChevronDown
                    className={`h-6 w-6 transition-transform ${open === q ? "rotate-180" : ""}`}
                  />
                </button>
                {open === q && (
                  <p className="px-5 pb-6 text-[15px] text-muted-foreground">
                    Robux is the in-experience currency used across the platform.
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
