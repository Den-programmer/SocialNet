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
}

const reducerFooter = (state = Footer, action) => {





    return state;
}

export default reducerFooter;