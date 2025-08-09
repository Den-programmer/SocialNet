import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './api'

type captchaUrlType = {
  url: string
}

export const securityApi = createApi({
  reducerPath: 'securityApi',
  baseQuery,
  endpoints: (builder) => ({
    getCaptchaUrl: builder.query<captchaUrlType, void>({
      query: () => `security/get-captcha-url`
    })
  })
})

export const {
  useGetCaptchaUrlQuery
} = securityApi