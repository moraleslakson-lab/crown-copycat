import { useEffect, useRef, useState } from "react";
import { CloseIcon, PlayersIcon, RobuxIcon, VerifiedIcon } from "@/components/rbx-icons";
import { useStoreSettings, type NotifStyle, type StoreSettings } from "@/lib/store-settings";

const TABS = ["Profile", "Friends", "Preferences", "Key"] as const;
type Tab = (typeof TABS)[number];

const ROBUX_CHIPS = [0, 170, 1000, 10000, 49400, 100000, 1000000];

const NOTIF_OPTIONS: { id: NotifStyle; title: string; badge: string }[] = [
  { id: "dark-banner", title: "Roblox Top Banner (Dark Inverted)", badge: "Dark Mode" },
  { id: "light-banner", title: "Roblox Top Banner (Light Theme)", badge: "White Card" },
  { id: "center", title: "Classic Center Dialog", badge: "In-Modal" },
  { id: "toast", title: "Liquid Glass Toast", badge: "Floating Pill" },
];

const DISCLAIMERS = [
  "Robux are sent instantly with no fees",
  "Robux arrive in 1 to 2 days with no fees",
  "Custom Disclaimer Phrase",
];

const tap = "transition-all duration-200 active:scale-[0.97] touch-manipulation";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/60 p-4">{children}</div>
  );
}

function SectionTitle({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">
      <h3 className="text-[13px] font-bold tracking-wide text-foreground/90 uppercase">{children}</h3>
      {right}
    </div>
  );
}

function Radio({ on }: { on: boolean }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
        on ? "border-primary bg-primary" : "border-border"
      }`}
    >
      {on && <span className="h-2 w-2 rounded-full bg-primary-foreground" />}
    </span>
  );
}

export function StoreSettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { settings, update, addFriend, removeFriend } = useStoreSettings();
  const [tab, setTab] = useState<Tab>("Profile");
  const [draft, setDraft] = useState<StoreSettings>(settings);
  const [nameInput, setNameInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setDraft(settings);
      setNameInput("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const set = (patch: Partial<StoreSettings>) => setDraft((d) => ({ ...d, ...patch }));

  const save = () => {
    update({
      username: draft.username.trim() || settings.username,
      handle: (draft.username.trim() || settings.username).toLowerCase().replace(/[^a-z0-9_]/g, ""),
      avatar: draft.avatar,
      robux: draft.robux,
      theme: draft.theme,
      notifStyle: draft.notifStyle,
      disclaimer: draft.disclaimer,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center">
      <div className="animate-in slide-in-from-bottom flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl border border-border/70 bg-background duration-300 sm:rounded-3xl">
        <div className="flex items-start gap-3 px-4 pt-4 pb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card">
            <PlayersIcon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold">Store Settings</h2>
              <span className="rounded-md bg-pill px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                made by VoidWalker
              </span>
            </div>
            <p className="text-[12px] text-muted-foreground">
              Customise theme, profile, friends and notification style
            </p>
          </div>
          <button onClick={onClose} aria-label="Close settings" className={tap}>
            <CloseIcon className="h-6 w-6 text-muted-foreground" />
          </button>
        </div>

        <div className="flex items-center gap-1 border-b border-border/60 px-3 pb-3">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`${tap} flex-1 rounded-xl px-2 py-2 text-[13px] font-semibold ${
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {t}
              {t === "Friends" && (
                <span className="ml-1 rounded-full bg-pill px-1.5 text-[11px]">
                  {settings.friends.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {tab === "Profile" && (
            <>
              <Card>
                <SectionTitle>Roblox profile &amp; official avatar</SectionTitle>
                <div className="flex items-center gap-3 rounded-xl bg-background/60 p-3">
                  <img
                    src={draft.avatar}
                    alt="Avatar preview"
                    className="h-14 w-14 rounded-xl bg-muted object-cover"
                  />
                  <div className="min-w-0">
                    <p className="flex items-center gap-1 truncate font-bold">
                      {draft.username || "Username"}
                      <VerifiedIcon className="h-4 w-4" />
                    </p>
                    <p className="truncate text-[12px] text-muted-foreground">
                      @{(draft.username || "username").toLowerCase()} • {draft.joined}
                    </p>
                    <p className="text-[11px] text-primary/80">Roblox Developer &amp; Creator</p>
                  </div>
                </div>

                <p className="mt-4 text-[12px] text-muted-foreground">
                  Enter your Roblox username to fetch live avatar and official metadata:
                </p>
                <div className="mt-2 flex gap-2">
                  <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-background/70 px-3 py-2.5">
                    <span className="text-muted-foreground">@</span>
                    <input
                      value={draft.username}
                      onChange={(e) => set({ username: e.target.value })}
                      placeholder="username"
                      className="w-full bg-transparent text-[15px] outline-none"
                    />
                  </div>
                  <button
                    onClick={() => set({ username: draft.username.trim() })}
                    className={`${tap} rounded-xl border border-primary/60 bg-primary/15 px-3 text-[13px] font-semibold text-primary`}
                  >
                    Fetch Live
                  </button>
                </div>

                <p className="mt-4 text-[12px] text-muted-foreground">
                  Or upload/paste custom avatar picture:
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => fileRef.current?.click()}
                    className={`${tap} flex-1 rounded-xl border border-border bg-pill px-3 py-2.5 text-[13px] font-semibold`}
                  >
                    Upload Avatar File
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      const reader = new FileReader();
                      reader.onload = () => set({ avatar: String(reader.result) });
                      reader.readAsDataURL(f);
                    }}
                  />
                  <input
                    value={draft.avatar.startsWith("data:") ? "" : draft.avatar}
                    onChange={(e) => set({ avatar: e.target.value })}
                    placeholder="https://tr.rbxcdn.com/Avatar..."
                    className="min-w-0 flex-1 rounded-xl border border-border bg-background/70 px-3 py-2.5 text-[13px] outline-none"
                  />
                </div>
              </Card>

              <Card>
                <SectionTitle>Robux balance amount</SectionTitle>
                <p className="text-[12px] text-muted-foreground">
                  Change the total Robux displayed in your top navigation bar and payment modals:
                </p>
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-border bg-background/70 px-3 py-3">
                  <RobuxIcon className="h-6 w-6" />
                  <input
                    type="number"
                    value={draft.robux}
                    onChange={(e) => set({ robux: Number(e.target.value) || 0 })}
                    className="w-full bg-transparent text-xl font-bold outline-none"
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ROBUX_CHIPS.map((v) => (
                    <button
                      key={v}
                      onClick={() => set({ robux: v })}
                      className={`${tap} rounded-full px-3 py-1.5 text-[12px] font-semibold ${
                        draft.robux === v ? "bg-primary text-primary-foreground" : "bg-pill"
                      }`}
                    >
                      {v.toLocaleString()} R$
                    </button>
                  ))}
                </div>
              </Card>
            </>
          )}

          {tab === "Friends" && (
            <>
              <Card>
                <SectionTitle>Add friend by Roblox username</SectionTitle>
                <p className="text-[12px] text-muted-foreground">
                  Search any Roblox player to link their official avatar directly to your friends list.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addFriend(nameInput);
                    setNameInput("");
                  }}
                  className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-background/70 px-3 py-2.5"
                >
                  <span className="text-muted-foreground">@</span>
                  <input
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Enter friend's Roblox username..."
                    className="w-full bg-transparent text-[15px] outline-none"
                  />
                  <button
                    type="submit"
                    className={`${tap} rounded-lg bg-primary px-3 py-1.5 text-[12px] font-semibold text-primary-foreground`}
                  >
                    Add
                  </button>
                </form>
              </Card>

              <Card>
                <SectionTitle>Your saved friends ({settings.friends.length})</SectionTitle>
                {settings.friends.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border p-6 text-center text-[13px] text-muted-foreground">
                    No friends added yet. Type a username above to add one.
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {settings.friends.map((f) => (
                      <li
                        key={f.id}
                        className="flex items-center gap-3 rounded-xl bg-background/60 px-3 py-2"
                      >
                        {f.avatar ? (
                          <img src={f.avatar} alt={f.name} className="h-9 w-9 rounded-full object-cover" />
                        ) : (
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pill text-sm font-bold">
                            {f.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                        <span className="flex-1 truncate text-[14px] font-semibold">{f.name}</span>
                        <button
                          onClick={() => removeFriend(f.id)}
                          aria-label={`Remove ${f.name}`}
                          className={tap}
                        >
                          <CloseIcon className="h-5 w-5 text-muted-foreground" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </>
          )}

          {tab === "Preferences" && (
            <>
              <Card>
                <SectionTitle
                  right={
                    <span className="rounded-md bg-pill px-2 py-0.5 text-[11px] font-semibold">
                      {draft.theme === "dark" ? "Dark Mode" : "Light Mode"}
                    </span>
                  }
                >
                  Theme appearance
                </SectionTitle>
                <p className="text-[12px] text-muted-foreground">
                  Invert background and surface colors across the store interface:
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {(
                    [
                      { id: "dark", label: "Dark Mode", canvas: "Dark Canvas", hex: "#0a0b0e" },
                      { id: "light", label: "Light Mode", canvas: "White Canvas", hex: "#ffffff" },
                    ] as const
                  ).map((o) => (
                    <button
                      key={o.id}
                      onClick={() => set({ theme: o.id })}
                      className={`${tap} rounded-2xl border p-3 text-left ${
                        draft.theme === o.id ? "border-primary bg-primary/10" : "border-border bg-card/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-semibold">{o.label}</span>
                        <Radio on={draft.theme === o.id} />
                      </div>
                      <div className="mt-3 flex items-center justify-between rounded-lg bg-background/70 px-2 py-1.5 text-[11px] text-muted-foreground">
                        {o.canvas}
                        <span>{o.hex}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              <Card>
                <SectionTitle>Robux send notification style</SectionTitle>
                <p className="text-[12px] text-muted-foreground">
                  Choose the notification style shown after sending Robux:
                </p>
                <div className="mt-3 space-y-2">
                  {NOTIF_OPTIONS.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => set({ notifStyle: o.id })}
                      className={`${tap} w-full rounded-2xl border p-3 text-left ${
                        draft.notifStyle === o.id
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card/50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[13px] font-semibold">
                          {o.title}
                          <span className="ml-2 rounded-md bg-pill px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                            {o.badge}
                          </span>
                        </span>
                        <Radio on={draft.notifStyle === o.id} />
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              <Card>
                <SectionTitle>Send Robux footer disclaimer</SectionTitle>
                <div className="space-y-2">
                  {DISCLAIMERS.map((d) => (
                    <button
                      key={d}
                      onClick={() => set({ disclaimer: d })}
                      className={`${tap} flex w-full items-center justify-between gap-2 rounded-xl border px-3 py-3 text-left text-[13px] ${
                        draft.disclaimer === d
                          ? "border-primary bg-primary/15"
                          : "border-border bg-card/50"
                      }`}
                    >
                      {d}
                      <Radio on={draft.disclaimer === d} />
                    </button>
                  ))}
                </div>
              </Card>
            </>
          )}

          {tab === "Key" && (
            <Card>
              <SectionTitle>Access key</SectionTitle>
              <p className="text-[12px] text-muted-foreground">
                Your store settings are saved on this device — no key required.
              </p>
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-background/70 px-3 py-3 text-[13px]">
                <span className="h-2 w-2 rounded-full bg-[#00b06f]" />
                Active on this device
              </div>
            </Card>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border/60 p-3">
          <button
            onClick={onClose}
            className={`${tap} rounded-xl bg-pill px-5 py-2.5 text-[14px] font-semibold`}
          >
            Cancel
          </button>
          <button
            onClick={save}
            className={`${tap} rounded-xl bg-primary px-5 py-2.5 text-[14px] font-semibold text-primary-foreground`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
