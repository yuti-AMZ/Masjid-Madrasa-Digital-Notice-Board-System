import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Link className="brand" to="/">
          <span className="brand-dot" aria-hidden />
          <span>Noor Masjid</span>
        </Link>
        <p>&copy; 2026 Noor Masjid. All rights reserved.</p>
      </div>
    </footer>
  )
}
