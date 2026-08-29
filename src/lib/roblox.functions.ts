import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type RobloxProfile = {
  id: number;
  name: string;
  displayName: string;
  joined: string;
  avatar: string;
  description: string;
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatJoined(iso?: string) {
  if (!iso) return "Joined Roblox";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Joined Roblox";
  return `Joined ${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

export const fetchRobloxProfile = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ username: z.string().min(1).max(30) }).parse(data))
  .handler(async ({ data }): Promise<RobloxProfile> => {
    const username = data.username.trim().replace(/^@/, "");

    const lookupRes = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ usernames: [username], excludeBannedUsers: false }),
    });
    if (!lookupRes.ok) throw new Error("Roblox lookup failed. Try again.");
    const lookup = (await lookupRes.json()) as {
      data?: { id: number; name: string; displayName: string }[];
    };
    const hit = lookup.data?.[0];
    if (!hit) throw new Error(`No Roblox user named "${username}"`);

    const [detailRes, thumbRes] = await Promise.all([
      fetch(`https://users.roblox.com/v1/users/${hit.id}`),
      fetch(
        `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${hit.id}&size=420x420&format=Png&isCircular=false`,
      ),
    ]);

    let joinedIso: string | undefined;
    let description = "";
    if (detailRes.ok) {
      const detail = (await detailRes.json()) as { created?: string; description?: string };
      joinedIso = detail.created;
      description = detail.description ?? "";
    }

    let avatar = "";
    if (thumbRes.ok) {
      const thumb = (await thumbRes.json()) as { data?: { imageUrl?: string }[] };
      avatar = thumb.data?.[0]?.imageUrl ?? "";
    }

    return {
      id: hit.id,
      name: hit.name,
      displayName: hit.displayName || hit.name,
      joined: formatJoined(joinedIso),
      avatar,
      description,
    };
  });
