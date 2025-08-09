import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery, ServerResType } from './api'

type loginType = {
  userId: string
  token: string | null
}

type LoginRequestType = {
  email: string | null
  password: string | null
  rememberMe: boolean
  captcha?: string | null
}

type RegisterRequestType = {
  email: string | null
  username: string | null
  password: string | null
  rememberMe: boolean
  captcha?: string | null
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: builder => ({
    login: builder.mutation<loginType, LoginRequestType>({
      query: (body) => ({
        url: 'api/auth/login',
        method: 'POST',
        body
      }),
      transformResponse: (response: ServerResType<loginType>) => response.data
    }),
    register: builder.mutation<loginType, RegisterRequestType>({
      query: (body) => ({
        url: 'api/auth/register',
        method: 'POST',
        body
      }),
      transformResponse: (response: ServerResType<loginType>) => response.data
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `api/auth/logout`,
        method: 'POST'
      })
    })
  })
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation
} = authApi