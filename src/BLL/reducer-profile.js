import MyAvatar from '../components/Article/Profile/images/userDeafultAvatar/avatar.jpg';

const ADD_POST = 'ADD-POST';
const POST_TITLE_CHANGE = 'POST-TITLE-CHANGE';
const POST_INF_CHANGE = 'POST-INF-CHANGE';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

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
  profile: {
    aboutMe: 'What can I say new?! I\'m GOD!!!',
    contacts: {
      facebook: "facebook.com",
      website: null,
      github: "github.com",
      instagram: "instagram.com",
      mainLink: null,
      twitter: "https://twitter.com",
      vk: "vk.com",
      youtube: null
    },
    fullName: "LightL2",
    photos: {
      large: MyAvatar,
      small: MyAvatar,
    },
    userId: 7735794,
  }, // Сделай null, когда данные будут приходить с сервера!
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
    case SET_USER_PROFILE: 
      stateCopy.profile = action.profile;
      
      return stateCopy;
    default:
      return state;
  }
}

export const addPost = (newPostTitle, newPostInformat) => {
  return { type: ADD_POST, newPostTitle, newPostInformat };
}
export const onPostTitleChange = (newPostTitleVal) => {
  return { type: POST_TITLE_CHANGE, newPostTitleVal }
}
export const onPostInfChange = (newPostInformatVal) => {
  return { type: POST_INF_CHANGE, newPostInformatVal }
}
export const setUserProfile = (profile) => {
  return { type: SET_USER_PROFILE, profile }
}

export default reducerProfile;