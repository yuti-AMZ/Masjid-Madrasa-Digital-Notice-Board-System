import { Link } from 'react-router-dom'

const YEAR = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Link className="brand" to="/">
          <span className="brand-dot" aria-hidden />
          <span>Noor Masjid</span>
        </Link>
        <p className="footer-copy">
          &copy; {YEAR} Noor Masjid. All rights reserved.
          <span className="footer-copy__meta"> · Gregorian calendar {YEAR}</span>
        </p>
      </div>
    </footer>
  )
}
