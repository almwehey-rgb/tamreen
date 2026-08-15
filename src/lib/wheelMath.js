export function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function segmentPath(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

export function uid(prefix = "id") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Computes the next absolute rotation (deg) so the wheel lands with
// `winnerIndex`'s segment centered under the fixed top pointer, spinning
// forward from the current rotation by several full turns.
export function computeSpinRotation(currentRotation, segCount, winnerIndex, minTurns = 5) {
  const segAngle = 360 / segCount;
  const winnerCenter = winnerIndex * segAngle + segAngle / 2;
  const normalizedCurrent = ((currentRotation % 360) + 360) % 360;
  let delta = (360 - winnerCenter - normalizedCurrent) % 360;
  if (delta < 0) delta += 360;
  const extraTurns = minTurns + Math.floor(Math.random() * 3);
  return currentRotation + extraTurns * 360 + delta;
}
