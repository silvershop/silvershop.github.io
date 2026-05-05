import { useId } from "react";

type IllustrationProps = {
  className?: string;
};

function sanitizeId(raw: string) {
  return raw.replace(/:/g, "");
}

export function ModuleIllustrationCore({ className }: IllustrationProps) {
  const uid = sanitizeId(useId());
  const g = `mfc-${uid}`;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 360"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${g}-bg`} x1="0" y1="0" x2="640" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e8f4fd" />
          <stop offset="1" stopColor="#fbfbfc" />
        </linearGradient>
        <linearGradient id={`${g}-accent`} x1="420" y1="80" x2="560" y2="260" gradientUnits="userSpaceOnUse">
          <stop stopColor="#119bf2" />
          <stop offset="1" stopColor="#0b7cc4" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill={`url(#${g}-bg)`} />
      <rect x="40" y="48" width="560" height="264" rx="20" fill="#fff" stroke="#e4e6eb" strokeWidth="1.5" />
      <circle cx="72" cy="80" r="5" fill="#f2c94c" />
      <circle cx="92" cy="80" r="5" fill="#6fcf97" />
      <circle cx="112" cy="80" r="5" fill="#eb5757" />
      <rect x="64" y="108" width="240" height="176" rx="12" fill="#f4f6f8" stroke="#d8dbe3" strokeWidth="1" />
      <rect x="80" y="124" width="100" height="72" rx="8" fill="#fff" stroke="#e4e6eb" />
        <rect x="92" y="136" width="76" height="36" rx="4" fill="#e3f2fc" />
      <rect x="92" y="178" width="48" height="8" rx="2" fill="#c9cdd5" />
      <rect x="92" y="192" width="72" height="6" rx="2" fill="#e4e6eb" />
      <rect x="192" y="124" width="100" height="72" rx="8" fill="#fff" stroke="#e4e6eb" />
        <rect x="204" y="136" width="76" height="36" rx="4" fill="#e4eef6" />
      <rect x="204" y="178" width="52" height="8" rx="2" fill="#c9cdd5" />
      <rect x="204" y="192" width="68" height="6" rx="2" fill="#e4e6eb" />
      <rect x="80" y="208" width="100" height="60" rx="8" fill="#fff" stroke="#e4e6eb" />
      <rect x="92" y="220" width="76" height="28" rx="4" fill="#edeef2" />
      <rect x="192" y="208" width="100" height="60" rx="8" fill="#fff" stroke="#e4e6eb" />
      <rect x="204" y="220" width="76" height="28" rx="4" fill="#edeef2" />
      <rect x="328" y="108" width="256" height="176" rx="12" fill="#fafbfc" stroke="#d8dbe3" strokeWidth="1" />
      <circle cx="456" cy="188" r="64" fill={`url(#${g}-accent)`} opacity="0.95" />
      <path
        d="M430 172h52l4 12h-60l4-12Zm8 12v36c0 4 3 8 8 8h24c5 0 8-4 8-8v-36"
        stroke="#fff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="432" y="160" width="48" height="16" rx="8" fill="#fff" opacity="0.35" />
      <rect x="352" y="124" width="120" height="10" rx="3" fill="#e4e6eb" />
      <rect x="352" y="142" width="88" height="8" rx="2" fill="#edeef2" />
    </svg>
  );
}

export function ModuleIllustrationDiscounts({ className }: IllustrationProps) {
  const uid = sanitizeId(useId());
  const g = `mfd-${uid}`;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 360"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${g}-bg`} x1="0" y1="0" x2="640" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fdf6f8" />
          <stop offset="0.5" stopColor="#fff" />
          <stop offset="1" stopColor="#f3f6ff" />
        </linearGradient>
        <linearGradient id={`${g}-burst`} x1="320" y1="72" x2="320" y2="288" gradientUnits="userSpaceOnUse">
          <stop stopColor="#119bf2" stopOpacity="0.2" />
          <stop offset="1" stopColor="#119bf2" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill={`url(#${g}-bg)`} />
      <circle cx="320" cy="180" r="200" fill={`url(#${g}-burst)`} />
      <circle cx="320" cy="168" r="72" fill="#119bf2" />
      <text
        x="320"
        y="188"
        textAnchor="middle"
        fill="#fff"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="56"
        fontWeight="700"
      >
        %
      </text>
      <g opacity="0.9">
        <rect x="96" y="96" width="168" height="56" rx="8" fill="#fff" stroke="#e4e6eb" strokeWidth="1.5" transform="rotate(-8 180 124)" />
        <rect x="112" y="112" width="56" height="8" rx="2" fill="#119bf2" opacity="0.35" transform="rotate(-8 180 124)" />
        <rect x="112" y="128" width="120" height="6" rx="2" fill="#e4e6eb" transform="rotate(-8 180 124)" />
        <line x1="120" y1="148" x2="232" y2="148" stroke="#d8dbe3" strokeWidth="1" strokeDasharray="6 6" transform="rotate(-8 180 124)" />
      </g>
      <g opacity="0.92">
        <rect x="392" y="220" width="176" height="64" rx="10" fill="#fff" stroke="#e4e6eb" strokeWidth="1.5" transform="rotate(10 480 252)" />
        <rect x="412" y="240" width="72" height="10" rx="3" fill="#119bf2" opacity="0.45" transform="rotate(10 480 252)" />
        <rect x="412" y="258" width="128" height="6" rx="2" fill="#edeef2" transform="rotate(10 480 252)" />
      </g>
      <circle cx="520" cy="88" r="6" fill="#119bf2" opacity="0.5" />
      <circle cx="104" y="248" r="5" fill="#119bf2" opacity="0.35" />
      <circle cx="548" y="260" r="4" fill="#119bf2" opacity="0.4" />
    </svg>
  );
}

export function ModuleIllustrationShipping({ className }: IllustrationProps) {
  const uid = sanitizeId(useId());
  const g = `mfs-${uid}`;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 360"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${g}-sky`} x1="320" y1="0" x2="320" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="#eef6fc" />
          <stop offset="1" stopColor="#fbfbfc" />
        </linearGradient>
        <linearGradient id={`${g}-road`} x1="0" y1="280" x2="640" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e4e6eb" />
          <stop offset="1" stopColor="#d8dbe3" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill={`url(#${g}-sky)`} />
      <path
        d="M0 260 C 120 220, 200 320, 320 260 S 520 200, 640 240 L 640 360 L 0 360 Z"
        fill={`url(#${g}-road)`}
        opacity="0.85"
      />
      <path
        d="M80 268 C 200 228, 240 288, 360 252 S 520 228, 600 248"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="14 18"
        opacity="0.9"
      />
      <circle cx="156" cy="232" r="10" fill="#119bf2" />
      <circle cx="156" cy="232" r="4" fill="#fff" />
      <circle cx="468" cy="216" r="10" fill="#119bf2" />
      <circle cx="468" cy="216" r="4" fill="#fff" />
      <rect x="128" y="108" width="88" height="72" rx="10" fill="#fff" stroke="#d8dbe3" strokeWidth="1.5" />
        <rect x="140" y="120" width="64" height="36" rx="6" fill="#e4eef5" />
      <rect x="140" y="162" width="48" height="6" rx="2" fill="#c9cdd5" />
      <g transform="translate(268 148)">
        <rect x="0" y="24" width="168" height="88" rx="12" fill="#0d0d0f" />
        <rect x="12" y="36" width="96" height="52" rx="8" fill="#2a2d35" stroke="#3d4450" />
        <circle cx="44" cy="124" r="14" fill="#1a1c22" stroke="#3d4450" strokeWidth="2" />
        <circle cx="128" cy="124" r="14" fill="#1a1c22" stroke="#3d4450" strokeWidth="2" />
        <rect x="120" y="40" width="40" height="44" rx="6" fill="#119bf2" opacity="0.85" />
        <path d="M8 24 L24 8 h120 l16 16" fill="#1f1f24" />
      </g>
      <rect x="472" y="124" width="72" height="56" rx="8" fill="#fff" stroke="#e4e6eb" strokeWidth="1.5" />
      <path d="M488 156h40M488 168h28" stroke="#c9cdd5" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function ModuleIllustration({ variant }: { variant: "core" | "discounts" | "shipping" }) {
  const cls = "module-feature__illustration-svg";
  if (variant === "core") return <ModuleIllustrationCore className={cls} />;
  if (variant === "discounts") return <ModuleIllustrationDiscounts className={cls} />;
  return <ModuleIllustrationShipping className={cls} />;
}
