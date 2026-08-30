import robuxIconAsset from "@/assets/robux_icon.png.asset.json";

type P = { className?: string };

export const RobuxIcon = ({ className }: P) => (
  <img
    src={robuxIconAsset.url}
    alt="Robux"
    className={`rbx-robux-img object-contain ${className ?? ""}`}
    draggable={false}
  />
);

export const SearchIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2" />
    <path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const BellIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M6 9a6 6 0 1 1 12 0c0 3.2.8 5 1.7 6H4.3C5.2 14 6 12.2 6 9Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const MenuIcon = ({ className }: P) => (
  <svg viewBox="0 0 28 24" fill="none" className={className}>
    <path
      d="M2 7h24M2 13h24M2 19h24"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <circle cx="24" cy="3" r="3" fill="currentColor" />
  </svg>
);

export const HomeIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 3 2.8 10.6h2.4V21h5.1v-5.6h3.4V21h5.1V10.6h2.4L12 3Z" />
  </svg>
);

export const MomentsIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3.5" width="18" height="17" rx="4" stroke="currentColor" strokeWidth="2" />
    <path d="M10 9.5 15 12l-5 2.5v-5Z" fill="currentColor" />
  </svg>
);

export const ChatIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M3.5 5.5h17v11h-9l-5 3.5v-3.5h-3v-11Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export const ThumbUpIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M8.5 21H5.2A1.2 1.2 0 0 1 4 19.8v-8.2c0-.7.5-1.2 1.2-1.2h3.3V21Zm1.7-11.6 4-7c.9.2 2.4.9 2.4 2.7 0 1.3-.6 3-.9 3.8h4c1 0 1.9.9 1.6 2l-1.9 8.2c-.2.9-1 1.5-1.9 1.5h-7.3V9.4Z" />
  </svg>
);

export const PlayersIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <circle cx="12" cy="6" r="3.2" />
    <path d="M12 10.5c-3 0-5.5 2-5.5 4.4V21h11v-6.1c0-2.4-2.5-4.4-5.5-4.4Z" />
  </svg>
);

export const VerifiedIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path
      d="M12 2 15 4.2 18.7 4l.8 3.6 3 2.2-1.6 3.3 1 3.6-3.4 1.4-1.9 3.2-3.6-.7-3.3 1.6-2.3-2.9-3.6-.9.3-3.7L2 10.9l2.6-2.6.1-3.7 3.6-.5L12 2Z"
      fill="#0b7bf5"
    />
    <path
      d="m8 12.2 2.7 2.6 5.2-5.4"
      stroke="#fff"
      strokeWidth="2.2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TagIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M13.2 3H20a1 1 0 0 1 1 1v6.8L10.6 21.2 2.8 13.4 13.2 3Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <circle cx="16.8" cy="7.2" r="1.6" fill="currentColor" />
  </svg>
);

export const GamepadIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2.5" y="6.5" width="19" height="11" rx="4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M7 10v4M5 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="16" cy="11" r="1.2" fill="currentColor" />
    <circle cx="18.4" cy="13.4" r="1.2" fill="currentColor" />
  </svg>
);

export const PlusPerkIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M9 17V7.8h3.4a3 3 0 0 1 0 6H9"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronRight = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export const ChevronDown = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="m5 9 7 7 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const CloseIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const SendIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 19V5m0 0-5 5m5-5 5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AddFriendIcon = ({ className }: P) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path
      d="M20 10h9v9h-9z"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinejoin="round"
      transform="rotate(-8 24 14)"
    />
    <path
      d="M12 38c0-7 5.5-12 12.5-12H28"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <path d="M36 24v12M30 30h12" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);
