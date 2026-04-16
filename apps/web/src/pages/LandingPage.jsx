import { Link } from 'react-router-dom'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { Button } from '../components/ui/Button'
import Announcements from './Announcements'

export function LandingPage() {
  function handleContactSubmit(e) {
    e.preventDefault()
  }

  return (
    <>
      <SiteHeader />

      <main>
        <section className="hero container" id="join">
          <div className="hero-content">
            <h1>
              Stay connected
              <br />
              with <span>your Masjid</span>
            </h1>
            <p>
              Get the latest prayer times, community announcements, and local
              events directly to your phone. Inspired by faith, driven by
              community.
            </p>

            <div className="hero-actions">
              <Link className="btn btn--primary" to="/signup">
                Join Our Community
              </Link>
              <a className="btn btn--secondary" href="#announcements">
                View Announcements
              </a>
            </div>
          </div>

          <div className="hero-device" aria-hidden>
            <div className="device-screen" />
          </div>
        </section>

        <section className="mission-wrap" id="mission">
          <section className="landing-announcements" id="announcements">
            <Announcements />
          </section>

          <div className="container mission">
            <h2>Our Journey &amp; Mission</h2>
            <p className="mission-text">
              Serving the community with devotion since 1986, Noor Masjid is more
              than a place of worship—we’re a center for spiritual growth and
              connection.
            </p>

            <div className="cards">
              <article className="card">
                <h3>Our History</h3>
                <p>
                  Founded by a small group of local families, Noor Masjid grew
                  from a humble prayer room into a vibrant community hub serving
                  thousands of worshippers weekly.
                </p>
              </article>

              <article className="card">
                <h3>Our Mission</h3>
                <p>
                  To provide a welcoming environment for worship, education, and
                  social support—fostering unity that lives by values of faith,
                  compassion, and excellence.
                </p>
              </article>

              <article className="card">
                <h3>Community Focus</h3>
                <p>
                  We prioritize youth engagement, interfaith dialogue, and
                  serving those in need through outreach programs and educational
                  initiatives.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="contact container" id="contact">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              Have questions about our programs or want to get involved? We are
              here to help. You can reach out to us any time.
            </p>

            <ul className="details">
              <li>
                <strong>Our Address:</strong> 123 Community Avenue, Addis Ababa
              </li>
              <li>
                <strong>Phone Number:</strong> +251 91 123 4567
              </li>
              <li>
                <strong>Email Us:</strong> contact@noormasjid.org
              </li>
            </ul>

            <div className="map-placeholder">Interactive Map Placeholder</div>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your name"
              autoComplete="name"
            />

            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="How can we help you?"
            />

            <Button type="submit" variant="primary">
              Send Message
            </Button>
          </form>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
