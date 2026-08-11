export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <rect width="48" height="48" rx="10" fill="#0B0F1A" />
        <path d="M24 8 L40 40 L30 40 L24 27 L18 40 L8 40 Z" fill="#3B82F6" />
        <path d="M24 8 L40 40 L30 40 L24 27 Z" fill="#60A5FA" />
      </svg>
    </div>
  );
}
