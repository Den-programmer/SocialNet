import { InferActionTypes, RootState } from './redux'
import { ThunkAction } from 'redux-thunk'
import { NewsAPI } from '../DAL/newsAPi'
import { resultCode } from '../DAL/api'
import { newsType } from '../types/NewsTypes/newsTypes'
import { setTextError } from './reducer-app'

const NewsState = {
    news: [] as newsType[],
    popularNews: [] as newsType[],
    newsPageId: null as number | null,
    isLoading: false
} 

type INewsState = typeof NewsState

const reducerNews = (state = NewsState, action: ActionsType):INewsState => {
    switch(action.type) {
        case `CHOOSE_NEWS_PAGE_ID`:
            return {
                ...state,
                newsPageId: action.itemId
            }
        case `SET_NEWS`:
            return {
                ...state,
                news: action.news
            }   
        case `SET_POPULAR_NEWS`:
            return {
                ...state,
                popularNews: action.news
            } 
        case `SET_IS_LOADING_STATUS`:
            return {
                ...state,
                isLoading: action.status
            }
        default: 
            return state
    }
}

type ActionsType = InferActionTypes<typeof actions>

// Action Creators!

export const actions = {
    chooseNewsPageId: (itemId: number | null) => ({ type: `CHOOSE_NEWS_PAGE_ID`, itemId } as const),
    setNews: (news: newsType[]) => ({ type: `SET_NEWS`, news } as const),
    setPopularNews: (news: newsType[]) => ({ type: `SET_POPULAR_NEWS`, news } as const),
    setIsLoadingStatus: (status: boolean) => ({ type: `SET_IS_LOADING_STATUS`, status } as const)
}

/* Thunks! */

type ThunkType = ThunkAction<Promise<void | any>, RootState, unknown, ActionsType>

export const requestNews = (): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setIsLoadingStatus(true))
        const res = await NewsAPI.getAllNews()
        if(res.resultCode === resultCode.Success) {
            dispatch(actions.setNews(res.data.articlesTitles))
            dispatch(actions.setIsLoadingStatus(false))
        } else {
            dispatch(actions.setIsLoadingStatus(false))
            // dispatch(setTextError(data.message))
        }
    } catch (e) {
        dispatch(actions.setIsLoadingStatus(false))
        alert(`Something's gone wrong, error status: 500`)
    }
} 
export const requestPopularNews = (): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setIsLoadingStatus(true))
        const res = await NewsAPI.getPopularNews()
        if(res.resultCode === resultCode.Success) {
            dispatch(actions.setPopularNews(res.data.articlesTitles))
            dispatch(actions.setIsLoadingStatus(false))
        } else {
            dispatch(actions.setIsLoadingStatus(false))
            // dispatch(setTextError(data.message))
        }
    } catch(e) {
        dispatch(actions.setIsLoadingStatus(false))
        alert(`Something's gone wrong, error status: 500`)
    }
} 

export default reducerNews