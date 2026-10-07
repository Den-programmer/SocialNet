import React from 'react'
import { useCookieConsent } from '../../hooks/useCookieConsent'
import classes from './cookieConsent.module.scss'

const CookieBanner: React.FC = () => {
  const { acceptRequired, acceptAll, openSettings } = useCookieConsent()

  return (
    <section
      className={classes.banner}
      role="region"
      aria-label="Cookie consent"
    >
      <div className={classes.bannerContent}>
        <div>
          <h2 className={classes.title}>Cookie choices</h2>
          <p className={classes.description}>
            We use necessary storage to keep you signed in, protect the
            application, and provide its core features. We do not currently
            use analytics, marketing, or preference cookies.
          </p>
        </div>
        <div className={classes.actions}>
          <button type="button" className={classes.secondaryButton} onClick={acceptRequired}>
            Only required
          </button>
          <button type="button" className={classes.primaryButton} onClick={acceptAll}>
            Allow all
          </button>
          <button type="button" className={classes.linkButton} onClick={openSettings}>
            Cookie settings
          </button>
        </div>
      </div>
    </section>
  )
}

export default CookieBanner
