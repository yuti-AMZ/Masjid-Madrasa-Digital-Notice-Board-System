/** Circular badge with mosque + crescent — matches sign-up mockup */
export function MasjidMark() {
  return (
    <div className="masjid-mark" aria-hidden>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="20" fill="rgba(22, 185, 133, 0.18)" />
        <path
          d="M20 8.5c-.8 0-1.4.35-1.8.9L12 14.2V26c0 .55.45 1 1 1h14c.55 0 1-.45 1-1V14.2l-6.2-4.8c-.4-.55-1-.9-1.8-.9z"
          stroke="var(--color-brand)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M14 26v-6.5c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2V26"
          stroke="var(--color-brand)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M24.5 11.2c1.2 0 2.2 1 2.2 2.2 0 .35-.08.68-.23.97a2.2 2.2 0 1 0-4.37-.32"
          stroke="var(--color-brand-dark)"
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  )
}
