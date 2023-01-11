import { InferActionTypes, RootState } from './redux'
import newsPhoto from '../images/News/news_img2.png'
import { ThunkAction } from 'redux-thunk'
// import { NewsAPI } from '../DAL/newsAPi'

const NewsState = {
    news: [
        {
            id: 1,
            title: 'Title of News...',
            text: 'Some news text that has no meaning, it exists only to fill the content block, so I\'m writting more text, more text mooooooooooooooooooooore text',
            photo: newsPhoto,
            date: 'March, 13 2022',
            content: '<div></div>',
            views: 200
        }
    ],
    popularNews: [
        {
            id: 1,
            title: 'Title of News...',
            text: 'The popular news that was watched by a lot of people, it meant to be on the front page',
            photo: newsPhoto,
            date: 'March, 13 2022',
            content: '<div></div>',
            views: 77678
        },
        {
            id: 2,
            title: 'Title of News...',
            text: 'The popular news that was watched by a lot of people, it meant to be on the front page',
            photo: newsPhoto,
            date: 'March, 13 2022',
            content: '<div></div>',
            views: 77678
        },
        {
            id: 3,
            title: 'Title of News...',
            text: 'The popular news that was watched by a lot of people, it meant to be on the front page',
            photo: newsPhoto,
            date: 'March, 13 2022',
            content: '<div></div>',
            views: 77678
        },
        {
            id: 4,
            title: 'Title of News...',
            text: 'The popular news that was watched by a lot of people, it meant to be on the front page',
            photo: newsPhoto,
            date: 'March, 13 2022',
            content: '<div></div>',
            views: 77678
        },
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
        default: 
            return state
    }
}

type ActionsType = InferActionTypes<typeof actions>

// Action Creators!

export const actions = {
    chooseNewsPageId: (itemId: number | null) => ({ type: `CHOOSE_NEWS_PAGE_ID`, itemId } as const)
}

/* Thunks! */

type ThunkType = ThunkAction<Promise<void | any>, RootState, unknown, ActionsType>

// export const requestNews = (): ThunkType => async (dispatch) => {
//     try {
//         const data = await NewsAPI.getAllNews()
//         debugger
//         console.log(data)
//     } catch (e) {
//         alert(`Something's gone wrong, error status: 500`)
//     }
// } 

export default reducerNews