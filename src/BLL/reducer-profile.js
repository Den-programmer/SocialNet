let ADD_POST = 'ADD-POST';
let POST_TITLE_CHANGE = 'POST-TITLE-CHANGE';
let POST_INF_CHANGE = 'POST-INF-CHANGE';

export const addPostActionCreator = (newPostTitle, newPostInformat) => {
  return { type: ADD_POST, newPostTitle: newPostTitle, newPostInformat: newPostInformat, };
}
export const onPostTitleChangeActionCreator = (newPostTitleVal) => {
  return { type: POST_TITLE_CHANGE, newPostTitleVal:newPostTitleVal }
}
export const onPostInfChangeActionCreator = (newPostInformatVal) => {
  return { type: POST_INF_CHANGE, newPostInformatVal:newPostInformatVal }
} 

export let profilePage = {
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
  } else if (action.type === POST_TITLE_CHANGE) {
      state.ValueOfPostTitle = action.newPostTitleVal;
  } else if (action.type === POST_INF_CHANGE) {
      state.ValueOfPostInf = action.newPostInformatVal;
  }

  return state;
}

export default reducerProfile;