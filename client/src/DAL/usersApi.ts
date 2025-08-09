import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './api'
import { userType } from '../types/FriendsType/friendsType'
import { ServerResType } from './api'

type requestUsersDataType = {
  items: Array<userType>
  totalCount: number
}

type requestFollowedUsersData = {
  following: Array<userType>
  totalCount: number
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery,
  tagTypes: ['Users', 'Friends'],
  endpoints: (builder) => ({
    getUsers: builder.query<requestUsersDataType, { pageSize: number; currentPage?: number; term?: string }>({
      query: ({ pageSize, currentPage = 1, term = '' }) =>
        `api/users/getUsers/?pageSize=${pageSize}&currentPage=${currentPage}&term=${term}`,
      transformResponse: (res: ServerResType<requestUsersDataType>) => res.data,
      providesTags: ['Users']
    }),
    followUser: builder.mutation<{}, string>({
      query: (userId) => ({
        url: `api/users/followUser/${userId}`,
        method: 'POST'
      }),
      transformResponse: (res: ServerResType<{}>) => res.data,
      invalidatesTags: ['Users', 'Friends']
    }),
    unfollowUser: builder.mutation<{}, string>({
      query: (userId) => ({
        url: `api/users/unfollowUser/${userId}`,
        method: 'DELETE'
      }),
      transformResponse: (res: ServerResType<{}>) => res.data,
      invalidatesTags: ['Users', 'Friends']
    }),
    getIsUserFollowed: builder.query<boolean, string>({
      query: (userId) => `api/users/isFollowed/${userId}`,
      transformResponse: (res: ServerResType<{ isFollowed: boolean }>) => res.data.isFollowed,
      providesTags: (result, error, id) => [{ type: 'Friends', id }]
    }),
    getFriends: builder.query<requestFollowedUsersData, void>({
      query: () => `api/users/getFriends`,
      transformResponse: (res: ServerResType<requestFollowedUsersData>) => res.data,
      providesTags: ['Friends']
    })
  })
})

export const {
  useLazyGetUsersQuery,
  useGetUsersQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetFriendsQuery,
  useGetIsUserFollowedQuery
} = usersApi