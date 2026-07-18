/**
 * Signature brand motif: an animated ECG "vitals pulse" line.
 * Used in the auth brand panel, page loaders, and empty/error states
 * so the whole product shares one recognizable heartbeat signature.
 */
export function PulseLine({ className = '' }) {
  return (
    <svg
      className={`pulse-line ${className}`}
      viewBox="0 0 340 28"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 14 H100 L112 4 L124 24 L136 8 L148 14 H340" />
    </svg>
  );
}
