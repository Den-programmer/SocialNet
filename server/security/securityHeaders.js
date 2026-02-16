// Security headers middleware
export const securityHeaders = (req, res, next) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY')
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff')
  
  // Enable XSS protection in older browsers
  res.setHeader('X-XSS-Protection', '1; mode=block')
  
  // Content Security Policy - prevents inline scripts and external sources
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'"
  )
  
  // Strict Transport Security - forces HTTPS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Permissions Policy (formerly Feature Policy)
  res.setHeader(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=()'
  )
  
  next()
}

// CORS configuration with security in mind
export const corsConfig = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL
    :'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400 // 24 hours
}

// Rate limiting middleware
const requestCounts = new Map()

export const rateLimitMiddleware = (maxRequests = 100, timeWindowMs = 60000) => {
  return (req, res, next) => {
    const key = req.ip + ':' + req.path
    const now = Date.now()
    
    if (!requestCounts.has(key)) {
      requestCounts.set(key, [])
    }
    
    const timestamps = requestCounts.get(key).filter(ts => now - ts < timeWindowMs)
    
    if (timestamps.length >= maxRequests) {
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter: Math.ceil(timeWindowMs / 1000)
      })
    }
    
    timestamps.push(now)
    requestCounts.set(key, timestamps)
    
    // Cleanup old entries
    if (requestCounts.size > 10000) {
      for (const [k, v] of requestCounts.entries()) {
        requestCounts.set(k, v.filter(ts => now - ts < timeWindowMs * 2))
      }
    }
    
    next()
  }
}

// Input length validation middleware
export const validateInputLength = (maxBodySize = '10mb') => {
  return (req, res, next) => {
    if (req.is('application/json')) {
      const contentLength = req.get('content-length')
      if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
        return res.status(413).json({
          error: 'Payload too large'
        })
      }
    }
    next()
  }
}
