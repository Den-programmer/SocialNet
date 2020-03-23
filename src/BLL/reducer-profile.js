let ADD_POST = 'ADD-POST';

export const addPostActionCreator = (newPostTitle, newPostInformat) => {
    return { type: ADD_POST, newPostTitle: newPostTitle, newPostInformat: newPostInformat, };
}

const reducerProfile = (state, action) => {
    if (action.type === ADD_POST) {
        let newPost = {
            id: state.posts.length + 1,
            postTitle: action.newPostTitle,
            postInf: action.newPostInformat,
            likesCount: 200000,
        }
        state.posts.push(newPost);
    }   // Don't forget about state!

    return state;
}

export default reducerProfile;