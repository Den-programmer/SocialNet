import test from 'node:test'
import assert from 'node:assert/strict'
import { rateLimitMiddleware } from './securityHeaders.js'

test('rate limiter rejects requests after the configured limit', () => {
  const middleware = rateLimitMiddleware(1, 60000, () => 'test-rate-limit')
  let nextCalls = 0

  const request = {
    ip: '127.0.0.1',
    method: 'POST',
    baseUrl: '/api/test',
    path: '/write',
    route: { path: '/write' }
  }

  const response = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(body) {
      this.body = body
      return this
    }
  }

  middleware(request, response, () => {
    nextCalls += 1
  })
  middleware(request, response, () => {
    nextCalls += 1
  })

  assert.equal(nextCalls, 1)
  assert.equal(response.statusCode, 429)
  assert.equal(response.body.error, 'Too many requests')
})
