export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return ''
  
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
}

/**
 * Sanitize object input recursively
 */
export const sanitizeObject = (obj: any): any => {
  if (typeof obj === 'string') {
    return sanitizeInput(obj)
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item))
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const sanitized: any = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        sanitized[key] = sanitizeObject(obj[key])
      }
    }
    return sanitized
  }
  
  return obj
}

/**
 * Escape HTML entities - safe for displaying user content
 * Converts special characters to HTML entities
 */
export const escapeHtml = (text: string): string => {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

/**
 * Validate email format on client side
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 100
}

/**
 * Validate password strength
 */
export const validatePassword = (password: string): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters')
  }
  if (password.length > 100) {
    errors.push('Password must be less than 100 characters')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain uppercase letter')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain lowercase letter')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain number')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate username format
 */
export const validateUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/
  return usernameRegex.test(username)
}

/**
 * Validate URL format
 */
export const validateUrl = (url: string): boolean => {
  if (!url) return true // Optional field
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const removeXss = (content: string): string => {
  const div = document.createElement('div')
  div.textContent = content
  return div.innerHTML
}

/**
 * Format text for safe display
 */
export const safeText = (text: string): string => {
  return escapeHtml(sanitizeInput(text))
}

/**
 * Check if URL is safe (same origin or trusted domains)
 */
export const isSafeUrl = (url: string): boolean => {
  if (!url) return true
  
  try {
    const urlObj = new URL(url, window.location.origin)
    const currentOrigin = window.location.origin
    
    // Allow relative URLs and same-origin URLs
    if (urlObj.origin === currentOrigin) {
      return true
    }
    
    // Allow HTTPS only for external URLs
    if (url.startsWith('https://')) {
      return true
    }
    
    return false
  } catch {
    return false
  }
}

/**
 * Validate form data before sending
 */
export const validateFormData = (data: any): {
  isValid: boolean
  errors: Record<string, string>
} => {
  const errors: Record<string, string> = {}
  
  // Validate email if present
  if (data.email && !validateEmail(data.email)) {
    errors.email = 'Invalid email format'
  }
  
  // Validate password if present
  if (data.password) {
    const passwordValidation = validatePassword(data.password)
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors[0]
    }
  }
  
  // Validate username if present
  if (data.username && !validateUsername(data.username)) {
    errors.username = 'Invalid username format'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
