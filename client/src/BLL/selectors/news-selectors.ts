import { RootState } from '../redux'

export const selectNews = (state: RootState) => {
    return state.newsPage.news
}

export const selectPopularNews = (state: RootState) => {
    return state.newsPage.popularNews
}

export const selectNewsPageId = (state: RootState) => {
    return state.newsPage.newsPageId
}

export const selectIsNewsLoadingStatus = (state: RootState) => {
    return state.newsPage.isLoading
}