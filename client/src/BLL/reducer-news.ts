import { InferActionTypes, RootState } from './redux'
import { ThunkAction } from 'redux-thunk'
import { NewsAPI } from '../DAL/newsAPi'
import { resultCode } from '../DAL/api'
import { newsType } from '../types/NewsTypes/newsTypes'
import { setTextError } from './reducer-app'

const NewsState = {
    news: [] as newsType[],
    popularNews: [] as newsType[],
    newsPageId: null as number | null
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
        default: 
            return state
    }
}

type ActionsType = InferActionTypes<typeof actions>

// Action Creators!

export const actions = {
    chooseNewsPageId: (itemId: number | null) => ({ type: `CHOOSE_NEWS_PAGE_ID`, itemId } as const),
    setNews: (news: newsType[]) => ({ type: `SET_NEWS`, news } as const),
    setPopularNews: (news: newsType[]) => ({ type: `SET_POPULAR_NEWS`, news } as const)
}

/* Thunks! */

type ThunkType = ThunkAction<Promise<void | any>, RootState, unknown, ActionsType>

export const requestNews = (): ThunkType => async (dispatch) => {
    try {
        const res = await NewsAPI.getAllNews()
        if(res.resultCode === resultCode.Success) {
            dispatch(actions.setNews(res.data.articlesTitles))
        } else {
            debugger
            // dispatch(setTextError(data.message))
        }
    } catch (e) {
        alert(`Something's gone wrong, error status: 500`)
    }
} 
export const requestPopularNews = (): ThunkType => async (dispatch) => {
    try {
        const res = await NewsAPI.getPopularNews()
        if(res.resultCode === resultCode.Success) {
            dispatch(actions.setPopularNews(res.data.articlesTitles))
        } else {
            debugger
            // dispatch(setTextError(data.message))
        }
    } catch(e) {
        alert(`Something's gone wrong, error status: 500`)
    }
} 

export default reducerNews