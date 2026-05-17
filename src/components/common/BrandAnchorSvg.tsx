/** Vektör çapa — PNG küçültmede pikselleşmez; marka lockup ile aynı oran */
export function BrandAnchorSvg({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle
        cx="28"
        cy="9"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="32 6"
        transform="rotate(-18 28 9)"
      />
      <path
        d="M28 16v46"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 25.5h26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M28 25.5l4 4-4 4-4-4 4-4z" fill="currentColor" />
      <path
        d="M31.5 32c5.5 4.5 5.5 11 1.5 16.5M33 36c3.5 2.8 3.5 6.8 1 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M28 62c-11 5.5-11.5 13.5-1.5 18.5 10-5 9.5-13-1.5-18.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M14.5 80.5l-4 5.5M41.5 80.5l4 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
