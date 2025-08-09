import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery, ServerResType } from './api' 
import { newsType } from '../types/NewsTypes/newsTypes'

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery,
  endpoints: (builder) => ({
    getAllNews: builder.query<newsType[], void>({
      query: () => 'api/news/getNews',
      transformResponse: (response: ServerResType<{ news: newsType[] }>) => {
        return response.data.news
      }
    }),
    getPopularNews: builder.query<newsType[], void>({
      query: () => 'api/news/getPopularNews',
      transformResponse: (response: ServerResType<{ news: newsType[] }>) => response.data.news
    })
  })
})

export const {
  useGetAllNewsQuery,
  useGetPopularNewsQuery
} = newsApi