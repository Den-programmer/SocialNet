import React, { useEffect, useRef } from 'react'
import { COOKIE_CATEGORIES } from '../../lib/cookie-consent/constants'
import { useCookieConsent } from '../../hooks/useCookieConsent'
import classes from './cookieConsent.module.scss'

const CookieSettings: React.FC = () => {
  const { consent, closeSettings, savePreferences } = useCookieConsent()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSettings()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closeSettings])

  return (
    <div className={classes.modalBackdrop} role="presentation">
      <section
        className={classes.settings}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
      >
        <div className={classes.settingsHeader}>
          <div>
            <h2 id="cookie-settings-title" className={classes.title}>
              Cookie settings
            </h2>
            <p className={classes.description}>
              Necessary storage is always active because the application
              depends on it.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className={classes.closeButton}
            onClick={closeSettings}
            aria-label="Close cookie settings"
          >
            ×
          </button>
        </div>

        <div className={classes.categoryList}>
          {COOKIE_CATEGORIES.map(category => (
            <div className={classes.category} key={category.id}>
              <div>
                <h3>{category.label}</h3>
                <p>{category.description}</p>
              </div>
              <span className={classes.alwaysActive}>Always active</span>
            </div>
          ))}
        </div>

        <p className={classes.emptyState}>
          This application has no optional cookie categories at this time.
        </p>

        <div className={classes.settingsActions}>
          <button type="button" className={classes.secondaryButton} onClick={closeSettings}>
            Cancel
          </button>
          <button
            type="button"
            className={classes.primaryButton}
            onClick={() => savePreferences({ necessary: consent?.necessary ?? true })}
          >
            Save preferences
          </button>
        </div>
      </section>
    </div>
  )
}

export default CookieSettings
