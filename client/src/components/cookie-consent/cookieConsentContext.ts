import { createContext } from 'react'
import type {
  CookieCategory,
  CookieConsent,
  CookieConsentSelection
} from '../../lib/cookie-consent/types'

export interface CookieConsentContextValue {
  consent: CookieConsent | null
  hasConsent: (category: CookieCategory) => boolean
  acceptRequired: () => void
  acceptAll: () => void
  openSettings: () => void
  closeSettings: () => void
  savePreferences: (selection: CookieConsentSelection) => void
  isSettingsOpen: boolean
}

export const CookieConsentContext =
  createContext<CookieConsentContextValue | null>(null)
