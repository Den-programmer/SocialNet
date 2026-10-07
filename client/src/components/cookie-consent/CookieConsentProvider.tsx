import React, { useCallback, useMemo, useState } from 'react'
import {
  hasCategoryConsent
} from '../../lib/cookie-consent/manager'
import {
  readCookieConsent,
  writeCookieConsent
} from '../../lib/cookie-consent/storage'
import type { CookieConsent, CookieConsentSelection } from '../../lib/cookie-consent/types'
import {
  CookieConsentContext,
  type CookieConsentContextValue
} from './cookieConsentContext'
import CookieBanner from './CookieBanner'
import CookieSettings from './CookieSettings'

interface CookieConsentProviderProps {
  children: React.ReactNode
}

const requiredSelection: CookieConsentSelection = { necessary: true }

const CookieConsentProvider: React.FC<CookieConsentProviderProps> = ({
  children
}) => {
  const [consent, setConsent] = useState<CookieConsent | null>(() =>
    readCookieConsent()
  )
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const savePreferences = useCallback((selection: CookieConsentSelection) => {
    setConsent(writeCookieConsent(selection))
    setIsSettingsOpen(false)
  }, [])

  const acceptRequired = useCallback(() => {
    savePreferences(requiredSelection)
  }, [savePreferences])

  const acceptAll = useCallback(() => {
    // There are currently no optional categories in this application.
    savePreferences(requiredSelection)
  }, [savePreferences])

  const openSettings = useCallback(() => {
    setIsSettingsOpen(true)
  }, [])

  const closeSettings = useCallback(() => {
    setIsSettingsOpen(false)
  }, [])

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      hasConsent: category => hasCategoryConsent(consent, category),
      acceptRequired,
      acceptAll,
      openSettings,
      closeSettings,
      savePreferences,
      isSettingsOpen
    }),
    [
      acceptAll,
      acceptRequired,
      closeSettings,
      consent,
      isSettingsOpen,
      openSettings,
      savePreferences
    ]
  )

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {!consent && !isSettingsOpen && <CookieBanner />}
      {isSettingsOpen && <CookieSettings />}
    </CookieConsentContext.Provider>
  )
}

export default CookieConsentProvider
