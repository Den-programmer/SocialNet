let ADD_POST = 'ADD-POST';
let POST_TITLE_CHANGE = 'POST-TITLE-CHANGE';
let POST_INF_CHANGE = 'POST-INF-CHANGE';

let profilePage = {
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
  let stateCopy = { ...state }
  stateCopy.posts = [...state.posts]
  
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: stateCopy.posts.length + 1,
        postTitle: action.newPostTitle,
        postInf: action.newPostInformat,
        likesCount: 200000,
      }
      stateCopy.posts.push(newPost);
      stateCopy.ValueOfPostTitle = '';
      stateCopy.ValueOfPostInf = '';

      return stateCopy;
    case POST_TITLE_CHANGE:
      stateCopy.ValueOfPostTitle = action.newPostTitleVal;

      return stateCopy;
    case POST_INF_CHANGE:
      stateCopy.ValueOfPostInf = action.newPostInformatVal;

      return stateCopy;
    default:
      return state;
  }
}

export const addPostActionCreator = (newPostTitle, newPostInformat) => {
  return { type: ADD_POST, newPostTitle: newPostTitle, newPostInformat: newPostInformat, };
}
export const onPostTitleChangeActionCreator = (newPostTitleVal) => {
  return { type: POST_TITLE_CHANGE, newPostTitleVal: newPostTitleVal }
}
export const onPostInfChangeActionCreator = (newPostInformatVal) => {
  return { type: POST_INF_CHANGE, newPostInformatVal: newPostInformatVal }
}

export default reducerProfile;