import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import avMe from "@/assets/av_me.jpg.asset.json";
import avSam from "@/assets/av_sam.jpg.asset.json";
import avLucio from "@/assets/av_lucio.jpg.asset.json";

export type Friend = { id: string; name: string; game: string; avatar?: string };

export type NotifStyle = "dark-banner" | "light-banner" | "center" | "toast";

export type StoreSettings = {
  username: string;
  handle: string;
  joined: string;
  avatar: string;
  robux: number;
  friends: Friend[];
  theme: "dark" | "light";
  notifStyle: NotifStyle;
  disclaimer: string;
};

const DEFAULTS: StoreSettings = {
  username: "aku_budoy",
  handle: "akubudoy",
  joined: "Joined 2018",
  avatar: avMe.url,
  robux: 400,
  friends: [
    { id: "sam", name: "sam", game: "Steal An Egg", avatar: avSam.url },
    { id: "lucio", name: "LUCIO", game: "Steal An Egg", avatar: avLucio.url },
  ],
  theme: "dark",
  notifStyle: "center",
  disclaimer: "Robux are sent instantly with no fees",
};

const KEY = "rbx-store-settings";

type Ctx = {
  settings: StoreSettings;
  update: (patch: Partial<StoreSettings>) => void;
  addFriend: (name: string) => void;
  removeFriend: (id: string) => void;
  reset: () => void;
};

const StoreCtx = createContext<Ctx | null>(null);

export function StoreSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSettings({ ...DEFAULTS, ...(JSON.parse(raw) as Partial<StoreSettings>) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  const value = useMemo<Ctx>(
    () => ({
      settings,
      update: (patch) => setSettings((s) => ({ ...s, ...patch })),
      addFriend: (name) =>
        setSettings((s) => {
          const clean = name.trim().replace(/^@/, "");
          if (!clean || s.friends.some((f) => f.name.toLowerCase() === clean.toLowerCase())) return s;
          return {
            ...s,
            friends: [
              ...s.friends,
              { id: `${clean}-${Date.now()}`, name: clean, game: "Playing Roblox" },
            ],
          };
        }),
      removeFriend: (id) => setSettings((s) => ({ ...s, friends: s.friends.filter((f) => f.id !== id) })),
      reset: () => setSettings(DEFAULTS),
    }),
    [settings],
  );

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStoreSettings() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStoreSettings must be used inside StoreSettingsProvider");
  return ctx;
}
