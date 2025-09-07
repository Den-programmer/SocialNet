import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery, ServerResType } from './api'
import { contactsType, postType, profileType } from '../types/ProfileTypes/profileTypes'
import imageCompression from 'browser-image-compression'

export type postPayload = {
  userId: string | undefined
  newPostTitle: string
  newPostInformat: string
  postPhoto: File
}

export type photosType = {
  small: string | null
  large: string | null
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery,
  tagTypes: ['Posts', 'Profile', 'Background'],
  endpoints: (builder) => ({
    getUsersProfile: builder.query<profileType, string>({
      query: (userId) => `api/profile/getProfile/${userId}`,
      transformResponse: (response: ServerResType<profileType>) => response.data,
      providesTags: (result, error, userId) => [{ type: 'Profile', id: userId }]
    }),
    getUserBackground: builder.query<string, string>({
      query: (userId) => `api/background/getBackground/${userId}`,
      transformResponse: (response: ServerResType<{ background: string }>) => response.data.background,
      providesTags: (result, error, userId) => [{ type: 'Background', id: userId }]
    }),
    getUsername: builder.query<string, string>({
      query: (userId) => `api/username/getUsername/${userId}`,
      transformResponse: (response: ServerResType<{ username: string }>) => response.data.username
    }),
    updateUsername: builder.mutation<string, { userId: string; username: string }>({
      query: ({ userId, username }) => {
        return {
          url: `api/username/saveUsername`,
          method: 'PUT',
          body: { userId, username }
        }
      },
      transformResponse: (response: ServerResType<{ username: string }>) => response.data.username
    }),
    getUsersPosts: builder.query<postType[], string>({
      query: (userId) => `api/posts/getPosts/${userId}`,
      providesTags: (result, error, userId) => [{ type: 'Posts', id: userId }],
      transformResponse: (response: ServerResType<postType[]>) => response.data
    }),
    createPost: builder.mutation<postType, postPayload>({
      async queryFn({ userId, newPostTitle, newPostInformat, postPhoto }, _queryApi, _extraOptions, baseQuery) {
        try {
          const compressed = await imageCompression(postPhoto, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1080,
            useWebWorker: true
          })

          const userDataString = localStorage.getItem('userData')
          const userIdfromStorage = userDataString ? JSON.parse(userDataString).userId : ''

          const formData = new FormData()
          formData.append('userId', userIdfromStorage || userId || '')
          formData.append('newPostTitle', newPostTitle)
          formData.append('newPostInformat', newPostInformat)
          formData.append('postPhoto', compressed)

          const token = localStorage.getItem('token') || ''

          const response = await fetch('api/posts/createPost', {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          const json = await response.json()

          if (!response.ok) {
            return { error: { status: response.status, data: json } }
          }

          return { data: json.data as postType }
        } catch (error) {
          return { error: { status: 500, data: 'Compression or network error' } }
        }
      },
      invalidatesTags: (result, error, { userId }) => [{ type: 'Posts', id: userId }]
    }),
    updateContacts: builder.mutation<contactsType, { contacts: contactsType; userId: string }>({
      query: ({ contacts, userId }) => ({
        url: `api/profile/contacts/updateContacts`,
        method: 'PUT',
        body: { contacts, userId }
      }),
      transformResponse: (response: ServerResType<{ contacts: contactsType }>) => response.data.contacts
    }),
    updateAboutMe: builder.mutation<string, { aboutMe: string; userId: string }>({
      query: ({ aboutMe, userId }) => ({
        url: `api/profile/aboutMe/updateAboutMe`,
        method: 'PUT',
        body: { aboutMe, userId }
      }),
      transformResponse: (response: ServerResType<{ aboutMe: string }>) => response.data.aboutMe
    }),
    getGender: builder.query<string, string>({
      query: (userId) => `api/gender/getGender/${userId}`,
      transformResponse: (response: ServerResType<{ gender: string }>) => response.data.gender
    }),
    updateGender: builder.mutation<string, { gender: string; userId: string }>({
      query: ({ gender, userId }) => ({
        url: `api/gender/updateGender`,
        method: 'PUT',
        body: { gender, userId }
      }),
      transformResponse: (response: ServerResType<{ gender: string }>) => response.data.gender
    }),
    setUserPhoto: builder.mutation<{ photos: photosType }, { photo: File; userId: string }>({
      async queryFn({ photo, userId }) {
        try {
          const compressed = await imageCompression(photo, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1080,
            useWebWorker: true
          })

          const formData = new FormData()
          formData.append('image', compressed)
          formData.append('userId', userId)

          for (let [key, value] of formData.entries()) {
            console.log(key, value)
          }


          const token = localStorage.getItem('token') || ''

          const response = await fetch('api/avatar/updateAvatar', {
            method: 'PUT',
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          const json = await response.json()

          if (!response.ok) {
            return { error: { status: response.status, data: json } }
          }

          return { data: json.data as { photos: photosType } }
        } catch (error) {
          console.error('Upload error raw:', error)

          return {
            error: {
              status: 500,
              data: typeof error === 'object' ? JSON.stringify(error) : String(error)
            }
          }
        }
      },
      invalidatesTags: (result, error, { userId }) => [{ type: 'Profile', id: userId }]
    }),
    setUserBackground: builder.mutation<string , { photo: File; userId: string }>({
      async queryFn({ photo, userId }) {
        try {
          const compressed = await imageCompression(photo, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1080,
            useWebWorker: true
          })

          const formData = new FormData()
          formData.append('image', compressed)
          formData.append('userId', userId)

          for (let [key, value] of formData.entries()) {
            console.log(key, value)
          }


          const token = localStorage.getItem('token') || ''

          const response = await fetch('api/background/updateBackground', {
            method: 'PUT',
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          const json = await response.json()

          if (!response.ok) {
            return { error: { status: response.status, data: json } }
          }

          return { data: json.data as string }
        } catch (error) {
          console.error('Upload error raw:', error)

          return {
            error: {
              status: 500,
              data: typeof error === 'object' ? JSON.stringify(error) : String(error)
            }
          }
        }
      },
      invalidatesTags: (result, error, { userId }) => [{ type: 'Background', id: userId }]
    })
  })
})

export const {
  useGetUsersProfileQuery,
  useLazyGetUsernameQuery,
  useGetUsernameQuery,
  useUpdateUsernameMutation,
  useGetUsersPostsQuery,
  useCreatePostMutation,
  useUpdateContactsMutation,
  useUpdateAboutMeMutation,
  useGetGenderQuery,
  useLazyGetGenderQuery,
  useUpdateGenderMutation,
  useSetUserPhotoMutation,
  useSetUserBackgroundMutation,
  useGetUserBackgroundQuery
} = profileApi


// getStatus: (userId:string)  => {
//     return instance.get<string>(profile/status/${userId}).then(response => {
//         return response.data
//     })
// },
// updateStatus: (status:string) => {
//     return instance.put<string>(profile/status, { status }).then(response =>{
//         return response.data
//     })
// },