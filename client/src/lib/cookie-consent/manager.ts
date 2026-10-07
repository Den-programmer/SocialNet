import { COOKIE_CATEGORIES } from './constants'
import type { CookieCategory, CookieConsentSelection } from './types'

export const requiredCookieCategories = COOKIE_CATEGORIES.filter(
  category => category.required
).map(category => category.id)

export const hasCategoryConsent = (
  consent: CookieConsentSelection | null,
  category: CookieCategory
): boolean => consent?.[category] === true
