import type { CookieCategory, CookieService } from './types'

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

export const COOKIE_SERVICES: ReadonlyArray<CookieService> = [
  {
    name: 'Cloudinary CDN',
    purpose: 'Delivers application images and uploaded media.',
    provider: 'Cloudinary',
    category: 'necessary',
    privacyUrl: 'https://cloudinary.com/privacy'
  },
  {
    name: 'SocialNet API and live messaging',
    purpose: 'Provides authentication, application data, and real-time messaging.',
    provider: 'SocialNet application server',
    category: 'necessary'
  },
  {
    name: 'Authentication token',
    purpose: 'Maintains the authenticated session and protects authenticated requests.',
    provider: 'SocialNet API',
    category: 'necessary'
  }
]
