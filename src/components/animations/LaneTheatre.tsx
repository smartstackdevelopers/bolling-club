const pins = [
  { left: "22%", top: "16%", delay: "0.02s" },
  { left: "36%", top: "16%", delay: "0.06s" },
  { left: "50%", top: "16%", delay: "0.1s" },
  { left: "64%", top: "16%", delay: "0.14s" },
  { left: "29%", top: "31%", delay: "0.04s" },
  { left: "43%", top: "31%", delay: "0.08s" },
  { left: "57%", top: "31%", delay: "0.12s" },
  { left: "36%", top: "46%", delay: "0.05s" },
  { left: "50%", top: "46%", delay: "0.09s" },
  { left: "43%", top: "61%", delay: "0.07s" },
];

const particles = [
  { left: "8%", top: "18%", size: 7, color: "#fbbf24", delay: "0s" },
  { left: "18%", top: "72%", size: 5, color: "#38bdf8", delay: "0.4s" },
  { left: "72%", top: "16%", size: 8, color: "#f472b6", delay: "0.8s" },
  { left: "86%", top: "64%", size: 6, color: "#c4b5fd", delay: "0.2s" },
  { left: "48%", top: "10%", size: 4, color: "#fde68a", delay: "1s" },
  { left: "90%", top: "30%", size: 5, color: "#67e8f9", delay: "0.6s" },
  { left: "6%", top: "46%", size: 4, color: "#f9a8d4", delay: "1.2s" },
  { left: "62%", top: "78%", size: 6, color: "#fbbf24", delay: "0.3s" },
];

export function Particles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {particles.map((particle) => (
        <span
          key={`${particle.left}-${particle.top}`}
          className="particle"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            animationDelay: particle.delay,
            boxShadow: `0 0 18px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
}

export function LaneTheatre() {
  return (
    <div className="lane-stage" aria-hidden="true">
      <div className="lane-floor" />
      <div className="lane-arrow" />
      {pins.map((pin) => (
        <svg
          key={`${pin.left}-${pin.top}`}
          viewBox="0 0 40 90"
          className="pin"
          style={{ left: pin.left, top: pin.top, animationDelay: pin.delay }}
        >
          <ellipse cx="20" cy="78" rx="10" ry="4" fill="rgba(0,0,0,.35)" />
          <path
            d="M20 6c7 0 12 9 12 18 0 6-2 11-5 15 5 2 8 8 8 16 0 12-7 22-15 22S5 67 5 55c0-8 3-14 8-16-3-4-5-9-5-15C8 15 13 6 20 6z"
            fill="#f8f5ef"
          />
          <rect x="12" y="34" width="16" height="4" rx="2" fill="#fb7185" />
          <rect x="13" y="41" width="14" height="3" rx="1.5" fill="#fb7185" />
        </svg>
      ))}
      <svg viewBox="0 0 80 80" className="ball">
        <defs>
          <radialGradient id="heroBall" cx="35%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#ddd6fe" />
            <stop offset="40%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="36" fill="url(#heroBall)" />
        <circle cx="28" cy="30" r="5" fill="#07091a" />
        <circle cx="42" cy="24" r="5" fill="#07091a" />
        <circle cx="34" cy="42" r="5" fill="#07091a" />
      </svg>
    </div>
  );
}
