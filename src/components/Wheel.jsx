import { COLORS, WHEEL_COLORS, FONT_HEAD } from "../lib/theme.js";
import { polarToCartesian, segmentPath } from "../lib/wheelMath.js";

const SIZE = 320;
const CENTER = SIZE / 2;
const RADIUS = 150;

function truncate(name, segCount) {
  const max = segCount <= 6 ? 16 : segCount <= 10 ? 12 : segCount <= 16 ? 9 : 6;
  return name.length > max ? name.slice(0, max - 1) + "…" : name;
}

function SegmentLabel({ name, midAngle, segCount }) {
  const fontSize = Math.max(8.5, Math.min(15, 360 / segCount / 2.1 + 6));
  const textRadius = RADIUS * 0.9;
  const pos = polarToCartesian(CENTER, CENTER, textRadius, midAngle);
  let theta = midAngle - 90;
  const norm = ((theta % 360) + 360) % 360;
  const flip = norm > 90 && norm < 270;
  if (flip) theta += 180;

  return (
    <text
      x={pos.x}
      y={pos.y}
      transform={`rotate(${theta} ${pos.x} ${pos.y})`}
      textAnchor={flip ? "end" : "start"}
      dominantBaseline="middle"
      fontFamily={FONT_HEAD}
      fontWeight={800}
      fontSize={fontSize}
      fill="#1a1414"
      style={{ pointerEvents: "none" }}
    >
      {truncate(name, segCount)}
    </text>
  );
}

export default function Wheel({ names, rotation, spinning, onTransitionEnd, size = SIZE }) {
  const n = names.length;
  const segAngle = n > 0 ? 360 / n : 360;

  return (
    <div style={{ position: "relative", width: size, height: size, maxWidth: "100%" }}>
      <div
        style={{
          position: "absolute",
          top: -2,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.45))",
        }}
      >
        <svg width="34" height="30" viewBox="0 0 34 30">
          <path d="M2 2 L32 2 L17 27 Z" fill={COLORS.accent} stroke={COLORS.bg} strokeWidth="1.5" />
        </svg>
      </div>

      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: `0 0 0 6px ${COLORS.surface2}, 0 0 0 9px ${COLORS.border}, 0 18px 40px rgba(0,0,0,0.5)`,
        }}
      >
        <div
          onTransitionEnd={onTransitionEnd}
          style={{
            width: "100%",
            height: "100%",
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 4.6s cubic-bezier(0.17, 0.67, 0.05, 1)" : "none",
          }}
        >
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" height="100%">
            {n === 0 ? (
              <circle cx={CENTER} cy={CENTER} r={RADIUS} fill={COLORS.surface2} />
            ) : (
              names.map((item, i) => {
                const start = i * segAngle;
                const end = start + segAngle;
                const mid = start + segAngle / 2;
                const color = WHEEL_COLORS[i % WHEEL_COLORS.length];
                return (
                  <g key={item.id}>
                    <path d={segmentPath(CENTER, CENTER, RADIUS, start, end)} fill={color} stroke={COLORS.bg} strokeWidth="1.5" />
                    <SegmentLabel name={item.name} midAngle={mid} segCount={n} />
                  </g>
                );
              })
            )}
          </svg>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: size * 0.22,
          height: size * 0.22,
          borderRadius: "50%",
          background: COLORS.surface,
          border: `4px solid ${COLORS.bg}`,
          boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
          zIndex: 2,
        }}
      />
    </div>
  );
}
