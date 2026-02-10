import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import { getToken } from '../BLL/reducer-auth'

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/',
  prepareHeaders: (headers) => {
    const token = getToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    headers.set('Content-Type', 'application/json')
    return headers
  },
  credentials: 'include'
}) satisfies BaseQueryFn<any, unknown, unknown>

export type ServerResType<T> = {
  resultCode: number
  message: string
  data: T
}

export enum resultCode {
  Success = 0,
  Error = 1
}

export enum captchaCode {
  captchaIsRequired = 10
}