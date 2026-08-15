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

export function UsersIcon({ size = 20, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19.5c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2" />
      <path d="M15.5 5.3a3.2 3.2 0 0 1 0 6.2M20.5 19.5c0-2.6-2-4.7-4.4-5.1" />
    </svg>
  );
}

export function SkullIcon({ size = 20, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M12 3.5c-4 0-7 2.9-7 6.9 0 2.3 1.1 4 2.7 5.2V18a1 1 0 0 0 1 1H10v1.6a.9.9 0 0 0 .9.9h2.2a.9.9 0 0 0 .9-.9V19h1.3a1 1 0 0 0 1-1v-2.4c1.6-1.2 2.7-2.9 2.7-5.2 0-4-3-6.9-7-6.9Z" />
      <circle cx="9.3" cy="10.4" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="14.7" cy="10.4" r="1.3" fill="currentColor" stroke="none" />
      <path d="M11 13.2h2l-.5 1.6h-1z" />
    </svg>
  );
}

export function ShuffleIcon({ size = 18, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M3.5 6.5h3.7l9 11h3.8M16.2 6.5H20v3.8M20 17.5v-3.8M3.5 17.5h3.7l3-3.7" />
      <path d="M13.8 8.5l1-2 2 1" />
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

export function PlusIcon({ size = 20, strokeWidth = 2, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M12 5v14M5 12h14" />
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

export function ClockIcon({ size = 20, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.2 2" />
    </svg>
  );
}

export function SoundOnIcon({ size = 20, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M4 9.5h3.2L12 5.8v12.4l-4.8-3.7H4z" />
      <path d="M16.2 9c1 .9 1.6 2 1.6 3.2s-.6 2.3-1.6 3.2M18.6 6.5c1.7 1.5 2.7 3.5 2.7 5.7s-1 4.2-2.7 5.7" />
    </svg>
  );
}

export function SoundOffIcon({ size = 20, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <path d="M4 9.5h3.2L12 5.8v12.4l-4.8-3.7H4z" />
      <path d="M16 9.8l4.4 4.4M20.4 9.8 16 14.2" />
    </svg>
  );
}

export function GlobeIcon({ size = 18, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5s-1.2 6.2-3.4 8.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5Z" />
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

export function SettingsIcon({ size = 20, strokeWidth = 1.8, color }) {
  return (
    <svg {...base(size, strokeWidth, color)}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 13.5a1.7 1.7 0 0 0 .34 1.87l.06.06a2.06 2.06 0 1 1-2.92 2.92l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V20a2.06 2.06 0 1 1-4.12 0v-.09a1.7 1.7 0 0 0-1.1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2.06 2.06 0 1 1-2.92-2.92l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H4a2.06 2.06 0 1 1 0-4.12h.09a1.7 1.7 0 0 0 1.55-1.1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2.06 2.06 0 1 1 2.92-2.92l.06.06a1.7 1.7 0 0 0 1.87.34H10a1.7 1.7 0 0 0 1-1.55V4a2.06 2.06 0 1 1 4.12 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2.06 2.06 0 1 1 2.92 2.92l-.06.06a1.7 1.7 0 0 0-.34 1.87V10a1.7 1.7 0 0 0 1.55 1H20a2.06 2.06 0 1 1 0 4.12h-.09a1.7 1.7 0 0 0-1.55 1Z" />
    </svg>
  );
}
