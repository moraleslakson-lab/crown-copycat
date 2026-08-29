import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BottomNav } from "@/components/bottom-nav";
import { StoreSettingsModal } from "@/components/store-settings-modal";
import { useStoreSettings } from "@/lib/store-settings";
import {
  AddFriendIcon,
  BellIcon,
  ChevronRight,
  MenuIcon,
  PlayersIcon,
  RobuxIcon,
  SearchIcon,
  ThumbUpIcon,
} from "@/components/rbx-icons";
const robloxLogo = "/roblox_logo.png";
const muscle = "/Screenshot_20260828-205446_1.jpg";
const leaves = "/Screenshot_20260828-205446_2.jpg";
const bridge = "/Screenshot_20260828-205446_3.jpg";
const greedy = "/Screenshot_20260828-205446_4.jpg";
const evade = "/Screenshot_20260828-205446_5.jpg";
const bloxfruits = "/Screenshot_20260828-211832.jpg";
const stealegg = "/Screenshot_20260828-211832.jpg";

const crown = "/192a7bd92c19b511.gif";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blox Hub — Mobile Game Feed" },
      {
        name: "description",
        content:
          "Browse recommended games, friends online and your continue-playing list in a dark mobile game feed.",
      },
      { property: "og:title", content: "Blox Hub — Mobile Game Feed" },
      {
        property: "og:description",
        content: "Recommended games, friends online and your continue-playing list.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const recommended = [
  { img: muscle.url, title: "💪Muscle Legends [U…", rating: "88% Rating" },
  { img: leaves.url, title: "🍂Clean all the leaves!", rating: "86% Rating" },
  { img: bridge.url, title: "Bridge Battles!", rating: "95% Rating" },
  { img: greedy.url, title: "Greedy Growers 🌱", rating: "97% Rating" },
];

const continues = [
  { img: evade.url, title: "Evade 🌊", stat: "93%", players: "50.2K" },
  { img: bloxfruits.url, title: "⚔️ Blox Fruits", stat: "Rodent_br…", avatar: true },
  { img: stealegg.url, title: "Steal An Egg", stat: "Ishow…", avatar: true },
];

function Header({ onBell }: { onBell: () => void }) {
  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <MenuIcon className="h-6 w-8 text-foreground" />
        <img src={robloxLogo.url} alt="Roblox" className="h-7 w-auto object-contain" />
        <div className="flex items-center gap-4">
          <SearchIcon className="h-6 w-6" />
          <Link to="/robux" aria-label="Buy Robux" className="rbx-tap">
            <RobuxIcon className="h-6 w-6" />
          </Link>
          <button onClick={onBell} aria-label="Open store settings" className="rbx-tap relative">
            <BellIcon className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 rounded-full bg-destructive px-1.5 text-[11px] font-bold leading-4">
              35
            </span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 text-center text-[15px]">
        <div className="border-b-2 border-foreground pb-2 font-semibold">For you</div>
        <div className="border-b-2 border-transparent pb-2 text-muted-foreground">Charts</div>
      </div>
      <div className="h-px w-full bg-border/60" />
    </header>
  );
}

function GameCard({ img, title, rating }: { img: string; title: string; rating: string }) {
  return (
    <div className="rbx-tap">
      <img src={img} alt={title} loading="lazy" className="aspect-[16/9] w-full rounded-xl object-cover" />
      <h3 className="mt-2 truncate text-[15px] font-bold">{title}</h3>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
        <ThumbUpIcon className="h-4 w-4 text-foreground/80" />
        {rating}
      </p>
    </div>
  );
}

function Index() {
  const { settings } = useStoreSettings();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen pb-24">
      <Header onBell={() => setSettingsOpen(true)} />
      <main className="mx-auto max-w-md">
        <section className="px-5 pt-5">
          <div className="flex items-center gap-4">
            <img
              src={settings.avatar}
              alt={`${settings.username} avatar`}
              className="h-11 w-11 rounded-full bg-muted object-cover"
            />
            <h1 className="text-xl font-bold">{settings.username}</h1>
          </div>
          <div className="mt-4 flex gap-4 overflow-x-auto pb-1 [scrollbar-width:none]">
            <button
              onClick={() => setSettingsOpen(true)}
              className="rbx-tap w-24 shrink-0 text-center"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-card">
                <AddFriendIcon className="h-11 w-11 text-foreground/80" />
              </div>
              <p className="mt-2 text-[13px] font-semibold">Add Friends</p>
            </button>
            {settings.friends.map((f) => (
              <div key={f.id} className="rbx-tap w-24 shrink-0 text-center">
                <div className="relative">
                  {f.avatar ? (
                    <img
                      src={f.avatar}
                      alt={f.name}
                      className="h-24 w-24 rounded-full bg-card object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-card text-2xl font-bold">
                      {f.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="absolute right-1 bottom-1 h-5 w-5 rounded-full border-2 border-background bg-[#00b06f]" />
                </div>
                <p className="mt-2 truncate text-[13px] font-bold">{f.name}</p>
                <p className="truncate text-[13px] text-muted-foreground">{f.game}</p>
              </div>
            ))}
            <div className="w-24 shrink-0 text-center">
              <div className="h-24 w-24 rounded-full bg-card" />
            </div>
          </div>
        </section>

        <section className="px-5 pt-6">
          <h2 className="text-[22px] font-bold">Recommended For You</h2>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-5">
            {recommended.map((g) => (
              <GameCard key={g.title} {...g} />
            ))}
          </div>
        </section>

        <section className="pt-7">
          <h2 className="flex items-center gap-2 px-5 text-[22px] font-bold">
            Continue <ChevronRight className="h-5 w-5" />
          </h2>
          <div className="mt-3 flex gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none]">
            {continues.map((g) => (
              <div key={g.title} className="rbx-tap w-[136px] shrink-0">
                <img
                  src={g.img}
                  alt={g.title}
                  loading="lazy"
                  className="aspect-square w-full rounded-xl object-cover"
                />
                <h3 className="mt-2 truncate text-[15px] font-bold">{g.title}</h3>
                <p className="mt-1.5 flex items-center gap-1.5 truncate text-[13px] text-muted-foreground">
                  {g.avatar ? (
                    <span className="h-5 w-5 shrink-0 rounded-full bg-muted" />
                  ) : (
                    <ThumbUpIcon className="h-4 w-4 shrink-0 text-foreground/80" />
                  )}
                  {g.stat}
                  {g.players && (
                    <>
                      <PlayersIcon className="h-4 w-4 shrink-0 text-foreground/80" />
                      {g.players}
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <BottomNav />
      <StoreSettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
