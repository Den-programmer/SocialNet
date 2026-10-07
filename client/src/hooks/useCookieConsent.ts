import { useContext } from 'react'
import { CookieConsentContext } from '../components/cookie-consent/cookieConsentContext'

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext)

  if (!context) {
    throw new Error(
      'useCookieConsent must be used within a CookieConsentProvider'
    )
  }

  return context
}
