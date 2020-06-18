const ADD_SIDEBAR_NAVLINK = 'ADD_SIDEBAR_NAVLINK';
const DELETE_SIDEBAR_NAVLINK = 'DELETE_SIDEBAR_NAVLINK';

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
        case ADD_SIDEBAR_NAVLINK: 
            let newLink = {
                id: state.navigationLinks.length + 1,
                name: action.title,
                path: action.path
            }
            return {
                ...state,
                navigationLinks: [...state.navigationLinks, newLink]
            }
        case DELETE_SIDEBAR_NAVLINK:
            return {
                ...state,
                navigationLinks: state.navigationLinks.filter(item => item.id !== action.id)
            }    
        default: 
            return state;
    }
}

export const addSideBarNavLink = (title, path) => {
    return { type: ADD_SIDEBAR_NAVLINK, title, path }
}
export const deleteSideBarNavLink = (id) => {
    return { type: DELETE_SIDEBAR_NAVLINK, id }
}

export default reducerSidebar;