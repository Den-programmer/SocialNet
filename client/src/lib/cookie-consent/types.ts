export type CookieCategory = 'necessary'

export interface CookieConsent {
  necessary: true
  timestamp: string
  version: string
}

export type CookieConsentSelection = Pick<CookieConsent, 'necessary'>
