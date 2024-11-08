import { footLinkType } from '../types/FooterTypes/footerTypes'

type FooterType = {
    year: number
    footInf: string
    footLinks: Array<footLinkType>
}

const Footer = {
    year: new Date().getFullYear(),
    footInf: 'This is footer\'s information!',
    footLinks: [
        {
            id: 7001,
            name: 'Profile',
            path: "/Profile"
        },
        {
            id: 7002,
            name: 'Messages',
            path: "/Messages"
        },
        {
            id: 7003,
            name: 'News',
            path: "/News"
        },
        {
            id: 7004,
            name: 'Music',
            path: "/Music"
        },
        {
            id: 7005,
            name: 'Options',
            path: "/Options"
        }
    ]
} as FooterType

const reducerFooter = (state = Footer, action:any): FooterType => {


    return state
}

export default reducerFooter