import { footLinkType } from '../types/FooterTypes/footerTypes';

type FooterType = {
    year: number
    footInf: string
    footLinks: Array<footLinkType>
}

let Footer = {
    year: 2020,
    footInf: 'This is footer\'s information!',
    footLinks: [
        {
            id: 1,
            name: 'Profile',
            path: "/Profile",
        },
        {
            id: 2,
            name: 'Messages',
            path: "/Messages",
        },
        {
            id: 3,
            name: 'News',
            path: "/News",
        },
        {
            id: 4,
            name: 'Music',
            path: "/Music",
        },
        {
            id: 5,
            name: 'Options',
            path: "/Options",
        },
    ],
} as FooterType

const reducerFooter = (state = Footer, action:any): FooterType => {





    return state;
}

export default reducerFooter;