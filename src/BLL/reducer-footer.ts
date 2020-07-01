type footLinkType = {
    id: number
    name: string
    url: string
}

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
            url: "/Profile",
        },
        {
            id: 2,
            name: 'Messages',
            url: "/Messages",
        },
        {
            id: 3,
            name: 'News',
            url: "/News",
        },
        {
            id: 4,
            name: 'Music',
            url: "/Music",
        },
        {
            id: 5,
            name: 'Options',
            url: "/Options",
        },
    ],
} as FooterType

const reducerFooter = (state = Footer, action:any): FooterType => {





    return state;
}

export default reducerFooter;