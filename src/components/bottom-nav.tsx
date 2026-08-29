import { Link, useRouterState } from "@tanstack/react-router";
import { useStoreSettings } from "@/lib/store-settings";
import { ChatIcon, HomeIcon, MomentsIcon } from "./rbx-icons";

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { settings } = useStoreSettings();
  const home = path === "/";

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-start justify-between px-6 pt-2 pb-3">
        <Link to="/" className="rbx-tap flex w-16 flex-col items-center gap-1">
          <HomeIcon className={`h-7 w-7 ${home ? "text-foreground" : "text-muted-foreground"}`} />
          <span className={`text-xs ${home ? "text-foreground" : "text-muted-foreground"}`}>
            Home
          </span>
        </Link>
        <div className="rbx-tap flex w-20 flex-col items-center gap-1">
          <MomentsIcon className="h-7 w-7 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Moments</span>
        </div>
        <div className="rbx-tap flex w-16 flex-col items-center gap-1">
          <ChatIcon className="h-7 w-7 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Chat</span>
        </div>
        <Link to="/robux" className="rbx-tap flex w-16 flex-col items-center gap-1">
          <img
            src={settings.avatar}
            alt="My avatar"
            className="h-7 w-7 rounded-full bg-muted object-cover"
          />
          <span className="text-xs text-muted-foreground">Me</span>
        </Link>
      </div>
    </nav>
  );
}
