import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userType } from '../types/FriendsType/friendsType'
import { usersApi } from '../DAL/usersApi'

export type FriendsState = {
  friends: userType[]
  users: userType[]
  usersInf: {
    isFetching: boolean
    totalCount: number
    pageSize: number
    currentPage: number
  }
  followingInProcess: string[]
  filter: {
    term: string
  }
  blacklist: string[]
}

const initialState: FriendsState = {
  friends: [],
  users: [],
  usersInf: {
    isFetching: true,
    totalCount: 0,
    pageSize: 12,
    currentPage: 1
  },
  followingInProcess: [],
  filter: { term: '' },
  blacklist: []
}

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setUsersTerm(state, action: PayloadAction<string>) {
      state.filter.term = action.payload
    },
    changePage(state, action: PayloadAction<number>) {
      state.usersInf.currentPage = action.payload
    },
    setIsFetching(state, action: PayloadAction<boolean>) {
      state.usersInf.isFetching = action.payload
    },
    addToBlacklist(state, action: PayloadAction<string>) {
      if (!state.blacklist.includes(action.payload)) {
        state.blacklist.push(action.payload)
      }
    },
    deleteFromBlacklist(state, action: PayloadAction<string>) {
      state.blacklist = state.blacklist.filter(id => id !== action.payload)
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      usersApi.endpoints.getUsers.matchFulfilled,
      (state, { payload }) => {
        state.users = payload.items
        state.usersInf.totalCount = payload.totalCount
        state.usersInf.isFetching = false
      }
    )

    builder.addMatcher(
      usersApi.endpoints.getFriends.matchFulfilled,
      (state, { payload }) => {
        state.friends = payload.following
      }
    )

    builder.addMatcher(
      usersApi.endpoints.followUser.matchPending,
      (state, { meta }) => {
        state.followingInProcess.push(meta.arg.originalArgs)
      }
    )
    builder.addMatcher(
      usersApi.endpoints.followUser.matchFulfilled,
      (state, { meta }) => {
        const userId = meta.arg.originalArgs
        state.users = state.users.map(u => u.id === userId ? { ...u, followed: true } : u)
        const user = state.users.find(u => u.id === userId)
        if (user && !state.friends.find(f => f.id === userId)) {
          state.friends.push({ ...user, followed: true })
        }
        state.followingInProcess = state.followingInProcess.filter(id => id !== userId)
      }
    )

    builder.addMatcher(
      usersApi.endpoints.unfollowUser.matchPending,
      (state, { meta }) => {
        state.followingInProcess.push(meta.arg.originalArgs)
      }
    )
    builder.addMatcher(
      usersApi.endpoints.unfollowUser.matchFulfilled,
      (state, { meta }) => {
        const userId = meta.arg.originalArgs
        state.users = state.users.map(u => u.id === userId ? { ...u, followed: false } : u)
        state.friends = state.friends.filter(f => f.id !== userId)
        state.followingInProcess = state.followingInProcess.filter(id => id !== userId)
      }
    )
    builder.addMatcher(
      usersApi.endpoints.getIsUserFollowed.matchFulfilled,
      (state, { payload, meta }) => {
        const userId = meta.arg.originalArgs as string
        const isFollowed = payload

        state.users = state.users.map(user =>
          user.id === userId ? { ...user, followed: isFollowed } : user
        )

        if (isFollowed) {
          const user = state.users.find(user => user.id === userId)
          if (user && !state.friends.find(f => f.id === userId)) {
            state.friends.push({ ...user, followed: true })
          }
        } else {
          state.friends = state.friends.filter(f => f.id !== userId)
        }
      }
    )
  }
})

export const {
  setUsersTerm,
  changePage,
  setIsFetching,
  addToBlacklist,
  deleteFromBlacklist
} = friendsSlice.actions

export const friendsActions = friendsSlice.actions
export default friendsSlice.reducer