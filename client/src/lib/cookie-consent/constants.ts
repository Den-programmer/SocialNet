import type { CookieCategory } from './types'

export const COOKIE_CONSENT_STORAGE_KEY = 'cookie-consent'
export const COOKIE_CONSENT_VERSION = '1'

export const COOKIE_CATEGORIES: ReadonlyArray<{
  id: CookieCategory
  label: string
  description: string
  required: boolean
}> = [
  {
    id: 'necessary',
    label: 'Necessary',
    description: 'Required for authentication, security, and core application functionality.',
    required: true
  }
]
