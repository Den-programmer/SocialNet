import { z } from 'zod'

// Base validation schemas
export const emailSchema = z.string().email('Invalid email format').trim().toLowerCase()
export const passwordSchema = z.string()
  .min(6, 'Password must be at least 6 characters')
  .max(100, 'Password must be less than 100 characters')
  .regex(/[A-Z]/, 'Password must contain uppercase letter')
  .regex(/[a-z]/, 'Password must contain lowercase letter')
  .regex(/[0-9]/, 'Password must contain number')

export const usernameSchema = z.string()
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username must be less than 20 characters')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens')

export const userIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format')

export const textSchema = z.string()
  .min(1, 'Text is required')
  .max(5000, 'Text must be less than 5000 characters')

export const urlSchema = z.string().url('Invalid URL format').or(z.string().length(0))

// Auth schemas
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
  rememberMe: z.boolean().optional(),
})

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

// Profile schemas
export const updateAboutMeSchema = z.object({
  userId: userIdSchema,
  aboutMe: z.string().max(5000, 'About me must be less than 5000 characters').trim(),
})

export const updateContactsSchema = z.object({
  userId: userIdSchema,
  contacts: z.object({
    github: urlSchema.optional(),
    twitter: urlSchema.optional(),
    linkedin: urlSchema.optional(),
    website: urlSchema.optional(),
  }).optional(),
})

export const createPostSchema = z.object({
  userId: userIdSchema,
  newPostTitle: z.string()
    .min(1, 'Post title is required')
    .max(200, 'Post title must be less than 200 characters')
    .trim(),
  newPostInformat: z.string()
    .min(1, 'Post content is required')
    .max(10000, 'Post content must be less than 10000 characters')
    .trim(),
})

export const updatePostSchema = z.object({
  postId: userIdSchema,
  updatedPostTitle: z.string()
    .min(1, 'Post title is required')
    .max(200, 'Post title must be less than 200 characters')
    .trim(),
})

export const updatePostContentSchema = z.object({
  postId: userIdSchema,
  updatedPostInformat: z.string()
    .min(1, 'Post content is required')
    .max(10000, 'Post content must be less than 10000 characters')
    .trim(),
})

export const messageSchema = z.object({
  content: z.string()
    .min(1, 'Message cannot be empty')
    .max(5000, 'Message must be less than 5000 characters')
    .trim(),
  image: z.string().url().optional().or(z.string().length(0)),
})

export const notificationSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(500, 'Title must be less than 500 characters')
    .trim(),
  itemType: z.string()
    .min(1, 'Item type is required')
    .max(50, 'Item type must be less than 50 characters')
    .trim(),
  pageUrl: urlSchema,
})

export const genderSchema = z.object({
  userId: userIdSchema,
  gender: z.enum(['male', 'female', 'other', '']),
})

export const saveUsernameSchema = z.object({
  userId: userIdSchema,
  username: usernameSchema,
})

export const followUserSchema = z.object({
  userId: userIdSchema,
})

export const searchSchema = z.object({
  term: z.string().max(100, 'Search term must be less than 100 characters').optional(),
  pageSize: z.number().int().positive().max(100).optional(),
  currentPage: z.number().int().positive().optional(),
})

// Server-side sanitization - removes HTML/script tags
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return str
  return str
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
}

export const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return sanitizeString(input)
  }
  if (Array.isArray(input)) {
    return input.map(item => sanitizeInput(item))
  }
  if (typeof input === 'object' && input !== null) {
    const sanitized = {}
    for (const key in input) {
      sanitized[key] = sanitizeInput(input[key])
    }
    return sanitized
  }
  return input
}

// Validation middleware factory
export const createValidator = (schema) => {
  return (req, res, next) => {
    try {
      // Sanitize input first
      req.body = sanitizeInput(req.body)
      req.query = sanitizeInput(req.query)
      req.params = sanitizeInput(req.params)

      // Then validate
      const validatedData = schema.parse(req.body)
      req.body = validatedData
      next()
    } catch (err) {
      const errors = err.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message,
      }))
      return res.status(400).json({
        error: 'Validation failed',
        details: errors,
      })
    }
  }
}
