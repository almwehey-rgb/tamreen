const base = (size, strokeWidth, color) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  style: color ? { color } : undefined,
});

export function HomeIcon({ size = 22, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1H10v-5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V20h3.5a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

export function WalletIcon({ size = 22, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <rect x="3" y="6.5" width="18" height="13" rx="2.2" />
      <path d="M3 10h18" />
      <path d="M15.5 14.5h2.7" />
    </svg>
  );
}

export function CoinIcon({ size = 22, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5.2" />
      <path d="M12 9.3v5.4M10.5 10.4c0-.8.7-1.3 1.5-1.3s1.6.4 1.6 1.1c0 1.6-3.1.9-3.1 2.6 0 .7.8 1.2 1.6 1.2s1.5-.4 1.5-1.2" />
    </svg>
  );
}

export function PiggyIcon({ size = 22, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M4.5 12.2c0-3.6 3.2-6.2 7.3-6.2 3 0 5.6 1.4 6.8 3.6h1.4a1 1 0 0 1 1 1.3l-.6 1.9-2.2.6v2.8l-1.8 1.6v1.7h-2.6v-1.2h-3.6v1.2H7.6v-2.3c-1.9-1-3.1-2.8-3.1-4.9Z" />
      <circle cx="9.6" cy="11" r=".9" fill="currentColor" stroke="none" />
      <path d="M12 6v-1.6M10 4.6h4" />
    </svg>
  );
}

export function TrendingUpIcon({ size = 22, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M3.5 16.5 9 11l4 3 7.5-8" />
      <path d="M15.5 6h5v5" />
    </svg>
  );
}

export function SettingsIcon({ size = 22, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 13.5a1.7 1.7 0 0 0 .34 1.87l.06.06a2.06 2.06 0 1 1-2.92 2.92l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V20a2.06 2.06 0 1 1-4.12 0v-.09a1.7 1.7 0 0 0-1.1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2.06 2.06 0 1 1-2.92-2.92l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H4a2.06 2.06 0 1 1 0-4.12h.09a1.7 1.7 0 0 0 1.55-1.1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2.06 2.06 0 1 1 2.92-2.92l.06.06a1.7 1.7 0 0 0 1.87.34H10a1.7 1.7 0 0 0 1-1.55V4a2.06 2.06 0 1 1 4.12 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2.06 2.06 0 1 1 2.92 2.92l-.06.06a1.7 1.7 0 0 0-.34 1.87V10a1.7 1.7 0 0 0 1.55 1H20a2.06 2.06 0 1 1 0 4.12h-.09a1.7 1.7 0 0 0-1.55 1Z" />
    </svg>
  );
}

export function PlusIcon({ size = 20, strokeWidth = 2, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function EditIcon({ size = 18, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M4 20h4.2L18.6 9.6a2 2 0 0 0 0-2.8l-1.4-1.4a2 2 0 0 0-2.8 0L4 15.8V20Z" />
      <path d="M13.5 6.5l4 4" />
    </svg>
  );
}

export function TrashIcon({ size = 18, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M5 7h14M9.5 7V5.2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V7M7.5 7l.7 12a1.4 1.4 0 0 0 1.4 1.3h4.8a1.4 1.4 0 0 0 1.4-1.3l.7-12" />
    </svg>
  );
}

export function XIcon({ size = 20, strokeWidth = 2, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function ChevronIcon({ size = 18, strokeWidth = 2, dir = "start", color }) {
  const rotate = dir === "start" ? 0 : 180;
  const { style, ...rest } = base(size, strokeWidth, color);
  return (
    <svg {...rest} style={{ ...style, transform: `rotate(${rotate}deg)` }}>
      <path d="M14.5 6.5 8.5 12l6 5.5" />
    </svg>
  );
}

export function ArrowUpRightIcon({ size = 16, strokeWidth = 2, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function ArrowDownRightIcon({ size = 16, strokeWidth = 2, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M7 7l10 10M17 7v8H9" />
    </svg>
  );
}

export function SwapIcon({ size = 16, strokeWidth = 2, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M6 8h11l-3-3M18 16H7l3 3" />
    </svg>
  );
}

export function DownloadIcon({ size = 18, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M12 4v11m0 0-4-4m4 4 4-4M5 18.5h14" />
    </svg>
  );
}

export function UploadIcon({ size = 18, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M12 15V4m0 0 4 4m-4-4-4 4M5 18.5h14" />
    </svg>
  );
}

export function ResetIcon({ size = 18, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M4.5 12a7.5 7.5 0 1 1 2.3 5.4" />
      <path d="M4.5 17v-4.5H9" />
    </svg>
  );
}

export function CheckIcon({ size = 16, strokeWidth = 2.2, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M5 12.5 9.5 17 19 7" />
    </svg>
  );
}
