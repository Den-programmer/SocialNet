let Sidebar = {
    navigationLinks: [
        {
            id: 1,
            name: 'Profile',
            path: '/Profile',
        },
        {
            id: 2,
            name: 'Messages',
            path: '/Messages',
        },
        {
            id: 3,
            name: 'News',
            path: '/News',
        },
        {
            id: 4,
            name: 'Music',
            path: '/Music',
        },
        {
            id: 5,
            name: 'Options',
            path: '/Options'
        }
    ],
}

const reducerSidebar = (state = Sidebar, action) => {
    switch (action.type) {


        
        default: 
            return state;
    }
}

export default reducerSidebar;