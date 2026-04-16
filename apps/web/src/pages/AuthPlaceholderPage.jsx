import { Link } from 'react-router-dom'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'

export function AuthPlaceholderPage({ title, description }) {
  return (
    <>
      <SiteHeader />
      <main className="container" style={{ padding: '4rem 0 5rem' }}>
        <h1 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem' }}>{title}</h1>
        <p style={{ margin: '0 0 1.25rem', color: 'var(--color-text-muted)' }}>
          {description ?? 'This screen is next on the roadmap.'}
        </p>
        <Link className="btn btn--secondary" to="/">
          Back to home
        </Link>
      </main>
      <SiteFooter />
    </>
  )
}
