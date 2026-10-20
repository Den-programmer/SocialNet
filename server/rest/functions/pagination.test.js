import test from 'node:test'
import assert from 'node:assert/strict'
import { paginationMeta, parsePagination } from './pagination.js'

test('pagination defaults invalid values and clamps page size', () => {
  assert.deepEqual(parsePagination({}, 20, 50), {
    page: 1,
    pageSize: 20
  })

  assert.deepEqual(parsePagination({ page: '-2', pageSize: '999' }, 20, 50), {
    page: 1,
    pageSize: 50
  })

  assert.deepEqual(parsePagination({ page: '3', pageSize: '0' }, 20, 50), {
    page: 3,
    pageSize: 1
  })

  assert.deepEqual(parsePagination({ page: 'not-a-number', pageSize: 'not-a-number' }, 20, 50), {
    page: 1,
    pageSize: 20
  })
})

test('pagination metadata reports navigation state', () => {
  assert.deepEqual(paginationMeta(2, 20, 45), {
    page: 2,
    pageSize: 20,
    totalCount: 45,
    totalPages: 3,
    hasNextPage: true,
    hasPreviousPage: true
  })

  assert.equal(paginationMeta(1, 20, 0).hasNextPage, false)
})

test('pagination metadata handles exact page boundaries', () => {
  assert.deepEqual(paginationMeta(2, 20, 40), {
    page: 2,
    pageSize: 20,
    totalCount: 40,
    totalPages: 2,
    hasNextPage: false,
    hasPreviousPage: true
  })
})
