import { InferActionTypes, RootState } from './redux'
import newsPhoto from '../images/News/news_img2.png'
import { ThunkAction } from 'redux-thunk'
import { NewsAPI } from '../DAL/newsAPi'
import { resultCode } from '../DAL/api'
import { newsType } from '../types/NewsTypes/newsTypes'
import { setTextError } from './reducer-app'

const NewsState = {
    news: [] as newsType[],
    popularNews: [
        // {
        //     id: 1,
        //     title: 'Title of News...',
        //     text: 'The popular news that was watched by a lot of people, it meant to be on the front page',
        //     photo: newsPhoto,
        //     date: 'March, 13 2022',
        //     content: '<div></div>',
        //     views: 77678
        // },
        // {
        //     id: 2,
        //     title: 'Title of News...',
        //     text: 'The popular news that was watched by a lot of people, it meant to be on the front page',
        //     photo: newsPhoto,
        //     date: 'March, 13 2022',
        //     content: '<div></div>',
        //     views: 77678
        // },
        // {
        //     id: 3,
        //     title: 'Title of News...',
        //     text: 'The popular news that was watched by a lot of people, it meant to be on the front page',
        //     photo: newsPhoto,
        //     date: 'March, 13 2022',
        //     content: '<div></div>',
        //     views: 77678
        // },
        // {
        //     id: 4,
        //     title: 'Title of News...',
        //     text: 'The popular news that was watched by a lot of people, it meant to be on the front page',
        //     photo: newsPhoto,
        //     date: 'March, 13 2022',
        //     content: '<div></div>',
        //     views: 77678
        // },
    ],
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
        default: 
            return state
    }
}

type ActionsType = InferActionTypes<typeof actions>

// Action Creators!

export const actions = {
    chooseNewsPageId: (itemId: number | null) => ({ type: `CHOOSE_NEWS_PAGE_ID`, itemId } as const),
    setNews: (news: newsType[]) => ({ type: `SET_NEWS`, news } as const)
}

/* Thunks! */

type ThunkType = ThunkAction<Promise<void | any>, RootState, unknown, ActionsType>

export const requestNews = (): ThunkType => async (dispatch) => {
    try {
        const res = await NewsAPI.getAllNews()
        if(res.resultCode === resultCode.Success) {
            debugger
            dispatch(actions.setNews(res.data.articlesTitles))
        } else {
            debugger
            // dispatch(setTextError(data.message))
        }
    } catch (e) {
        alert(`Something's gone wrong, error status: 500`)
    }
} 

export default reducerNews