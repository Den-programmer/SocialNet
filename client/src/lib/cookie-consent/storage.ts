import {
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_CONSENT_VERSION
} from './constants'
import type { CookieConsent, CookieConsentSelection } from './types'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isValidConsent = (value: unknown): value is CookieConsent =>
  isRecord(value) &&
  value.necessary === true &&
  typeof value.timestamp === 'string' &&
  typeof value.version === 'string' &&
  value.version === COOKIE_CONSENT_VERSION

export const readCookieConsent = (): CookieConsent | null => {
  if (typeof window === 'undefined') return null

  try {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
    if (!stored) return null

    const parsed: unknown = JSON.parse(stored)
    return isValidConsent(parsed) ? parsed : null
  } catch {
    return null
  }
}

export const writeCookieConsent = (
  selection: CookieConsentSelection
): CookieConsent => {
  const consent: CookieConsent = {
    ...selection,
    timestamp: new Date().toISOString(),
    version: COOKIE_CONSENT_VERSION
  }

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(
        COOKIE_CONSENT_STORAGE_KEY,
        JSON.stringify(consent)
      )
    } catch {
      // Consent still applies for this session when storage is unavailable.
    }
  }

  return consent
}

export const clearCookieConsent = (): void => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY)
  } catch {
    // Ignore storage failures; the in-memory provider state remains authoritative.
  }
}
