/**
 * Soft grey cloud backdrop drawn with SVG noise — no image download needed.
 * Fixed behind the page; purely decorative.
 */
export function Sky() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#b9b9b9_0%,#d4d4d4_45%,#c4c4c4_100%)]" />
      <svg className="absolute inset-0 size-full" preserveAspectRatio="none">
        <filter id="clouds" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0035 0.006" numOctaves="5" seed="7" />
          <feColorMatrix
            values="0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 1.6 -0.55"
          />
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <rect width="100%" height="100%" filter="url(#clouds)" />
      </svg>
    </div>
  );
}
