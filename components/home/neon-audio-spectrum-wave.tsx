import type { CSSProperties } from "react";
import styles from "./neon-audio-spectrum-wave.module.css";

const VIEWBOX_WIDTH = 1280;
const VIEWBOX_HEIGHT = 360;
const BAR_COUNT = 172;
const CENTER_Y = VIEWBOX_HEIGHT / 2;
const BAR_GAP = 3;
const BAR_WIDTH = (VIEWBOX_WIDTH - BAR_GAP * (BAR_COUNT - 1)) / BAR_COUNT;

type WaveBar = {
  x: number;
  height: number;
  delay: string;
  duration: string;
  opacity: number;
  hueShift: number;
};

function buildEnvelope(t: number) {
  const base = Math.pow(Math.sin(Math.PI * t), 1.7);
  const peakA = Math.exp(-Math.pow((t - 0.28) / 0.07, 2));
  const peakB = Math.exp(-Math.pow((t - 0.5) / 0.05, 2));
  const peakC = Math.exp(-Math.pow((t - 0.68) / 0.08, 2));

  return base * 0.18 + peakA * 0.74 + peakB * 1 + peakC * 0.8;
}

function buildBars(): WaveBar[] {
  return Array.from({ length: BAR_COUNT }, (_, index) => {
    const t = index / Math.max(BAR_COUNT - 1, 1);
    const envelope = buildEnvelope(t);
    const ripple = Math.sin(index * 0.52) * 0.06 + Math.cos(index * 0.17) * 0.04;
    const height = 4 + (envelope + ripple) * 118;
    const x = index * (BAR_WIDTH + BAR_GAP);

    return {
      x,
      height,
      delay: `${-(index % 28) * 0.05}s`,
      duration: `${2.8 + (index % 11) * 0.14}s`,
      opacity: 0.32 + envelope * 0.62,
      hueShift: t,
    };
  });
}

const BARS = buildBars();

export default function NeonAudioSpectrumWave() {
  return (
    <div className={styles.frame}>
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        className={styles.svg}
        role="img"
        aria-label="Animated voice waveform"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="voice-wave-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#5ef3ff" />
            <stop offset="45%" stopColor="#4b88ff" />
            <stop offset="100%" stopColor="#845dff" />
          </linearGradient>
          <linearGradient id="mic-icon-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#5ef3ff" />
            <stop offset="50%" stopColor="#4b88ff" />
            <stop offset="100%" stopColor="#845dff" />
          </linearGradient>
          </defs>

        {BARS.map((bar, index) => {
          const barHeight = Math.max(4, bar.height);
          const topY = CENTER_Y - barHeight / 2;

          return (
            <rect
              key={index}
              x={bar.x}
              y={topY}
              width={BAR_WIDTH}
              height={barHeight}
              rx={BAR_WIDTH / 2}
              ry={BAR_WIDTH / 2}
              fill="url(#voice-wave-gradient)"
              className={styles.waveBar}
              style={
                {
                  "--delay": bar.delay,
                  "--duration": bar.duration,
                  "--opacity": bar.opacity,
                  "--bar-width": `${BAR_WIDTH}px`,
                  "--bar-height": `${barHeight}px`,
                  "--hue-shift": bar.hueShift,
                } as CSSProperties
              }
            />
          );
        })}
      </svg>

      <div className={styles.micBadge} aria-hidden="true">
        <div className={styles.micBadgeCircle} />
        <svg
          viewBox="0 0 64 64"
          className={styles.micIcon}
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M32 40a8 8 0 0 0 8-8V20a8 8 0 1 0-16 0v12a8 8 0 0 0 8 8Z" />
          <path d="M20 31a12 12 0 0 0 24 0" />
          <path d="M32 43v7" />
          <path d="M25 50h14" />
        </svg>
      </div>
    </div>
  );
}
