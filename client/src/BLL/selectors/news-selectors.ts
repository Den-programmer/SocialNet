import { RootState } from '../redux'

export const getNews = (state: RootState) => {
    return state.newsPage.news
}

export const getPopularNews = (state: RootState) => {
    return state.newsPage.popularNews
}

export const getNewsPageId = (state: RootState) => {
    return state.newsPage.newsPageId
}