import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { newsType } from '../types/NewsTypes/newsTypes'

interface NewsState {
  news: newsType[]
  popularNews: newsType[]
  newsPageId: number | null
  isLoading: boolean
}

const initialState: NewsState = {
  news: [],
  popularNews: [],
  newsPageId: null,
  isLoading: false
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    chooseNewsPageId(state, action: PayloadAction<number | null>) {
      state.newsPageId = action.payload
    }
  }
})

export const { chooseNewsPageId } = newsSlice.actions
export const newsActions = newsSlice.actions
export default newsSlice.reducer