import { Link } from 'react-router-dom'

export function SiteHeader() {
  return (
    <header className="topbar container">
      <Link className="brand" to="/">
        <span className="brand-dot" aria-hidden />
        <span>Noor Masjid</span>
      </Link>

      <nav className="nav-links" aria-label="Main navigation">
        <Link to="/">Home</Link>
        <a href="#prayer">Prayer Times</a>
        <Link to="/khutbahs">Friday</Link>
        <a href="#mission">Mission</a>
        <a href="#contact">Contact</a>
      </nav>

      <Link className="btn btn--primary btn--sm" to="/signup">
        Join Our Community
      </Link>
    </header>
  )
}
