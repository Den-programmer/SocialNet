import React from 'react'
import { useCookieConsent } from '../../hooks/useCookieConsent'
import classes from './cookieConsent.module.scss'

const CookieSettingsButton: React.FC = () => {
  const { consent, isSettingsOpen, openSettings } = useCookieConsent()

  if (!consent || isSettingsOpen) return null

  return (
    <button type="button" className={classes.manageButton} onClick={openSettings}>
      Cookie settings
    </button>
  )
}

export default CookieSettingsButton
