let ADD_POST = 'ADD-POST';

export const addPostActionCreator = (newPostTitle, newPostInformat) => {
    return { type: ADD_POST, newPostTitle: newPostTitle, newPostInformat: newPostInformat, };
}

export let profilePage =  {
    posts: [
      {
        id: 1,
        postTitle: "It's a post!@",
        postInf: "This post has no meaning!",
        likesCount: 200000,
      },
      {
        id: 2,
        postTitle: "It's a post!@",
        postInf: "This post has no meaning!",
        likesCount: 200000,
      },
      {
        id: 3,
        postTitle: "It's a post!@",
        postInf: "This post has no meaning!",
        likesCount: 200000,
      },
    ],
    ValueOfPostTitle: '',
    ValueOfPostInf: '',
}

const reducerProfile = (state = profilePage, action) => {
    if (action.type === ADD_POST) {
        let newPost = {
            id: state.posts.length + 1,
            postTitle: action.newPostTitle,
            postInf: action.newPostInformat,
            likesCount: 200000,
        }
        state.posts.push(newPost);
    } 
    return state;
}

export default reducerProfile;