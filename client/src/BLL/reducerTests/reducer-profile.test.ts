import { describe, it, expect, beforeEach } from 'vitest';
import profileReducer, { profileActions } from '../reducer-profile';
import { PostType, } from '../../types/ProfileTypes/profileTypes';

describe('Profile Reducer', () => {
  let initialState: ReturnType<typeof profileReducer>;

  beforeEach(() => {
    initialState = profileReducer(undefined, { type: '' });
  });

  describe('Initial State', () => {
    it('should return the initial state', () => {
      expect(initialState).toBeDefined();
      expect(initialState.posts).toEqual([]);
      expect(initialState.username).toBe('Your nickname');
      expect(initialState.followed).toBe(false);
      expect(initialState.gender).toBe('Not Chosen');
    });

    it('should have proper initial profile structure', () => {
      expect(initialState.profile).toEqual({
        status: '',
        aboutMe: '',
        contacts: {
          facebook: '',
          website: '',
          vk: '',
          twitter: '',
          instagram: '',
          youtube: '',
          github: '',
          mainLink: ''
        },
        photos: { large: '', small: '' },
        userId: '0'
      });
    });

    it('should have profile navigation menu with 6 items', () => {
      expect(initialState.profileNavigationMenu).toHaveLength(6);
      expect(initialState.profileNavigationMenu[0].title).toBe('Wall');
      expect(initialState.profileNavigationMenu[1].title).toBe('Profile');
    });

    it('should have change photos menu with 3 items', () => {
      expect(initialState.changePhotosMenu).toHaveLength(3);
      expect(initialState.changePhotosMenu[0].isActive).toBe(true);
    });
  });

  describe('changeProfileNavItemChosenStatus', () => {
    it('should set the chosen profile nav item', () => {
      const payload = 7012; // Wall
      const newState = profileReducer(initialState, profileActions.changeProfileNavItemChosenStatus(payload));

      expect(newState.profileNavigationMenu[0].isChosen).toBe(true); // Wall
      expect(newState.profileNavigationMenu[1].isChosen).toBe(false); // Profile
    });

    it('should deselect previously chosen item', () => {
      let state = profileReducer(initialState, profileActions.changeProfileNavItemChosenStatus(7012));
      expect(state.profileNavigationMenu[0].isChosen).toBe(true);
      expect(state.profileNavigationMenu[1].isChosen).toBe(false);

      state = profileReducer(state, profileActions.changeProfileNavItemChosenStatus(7001));
      expect(state.profileNavigationMenu[0].isChosen).toBe(false);
      expect(state.profileNavigationMenu[1].isChosen).toBe(true);
    });

    it('should handle selecting messages nav item', () => {
      const newState = profileReducer(initialState, profileActions.changeProfileNavItemChosenStatus(7002));
      const messagesItem = newState.profileNavigationMenu.find(item => item.id === 7002);
      expect(messagesItem?.isChosen).toBe(true);
    });
  });

  describe('choosePhotosMenuItem', () => {
    it('should select change profile photo menu item', () => {
      const newState = profileReducer(initialState, profileActions.choosePhotosMenuItem(1));

      expect(newState.changePhotosMenu[0].isActive).toBe(true);
      expect(newState.changePhotosMenu[1].isActive).toBe(false);
      expect(newState.changePhotosMenu[2].isActive).toBe(false);
      expect(newState.changePhotosMenuItemId).toBe(1);
    });

    it('should select delete profile photo menu item', () => {
      const newState = profileReducer(initialState, profileActions.choosePhotosMenuItem(2));

      expect(newState.changePhotosMenu[0].isActive).toBe(false);
      expect(newState.changePhotosMenu[1].isActive).toBe(true);
      expect(newState.changePhotosMenu[2].isActive).toBe(false);
      expect(newState.changePhotosMenuItemId).toBe(2);
    });

    it('should select change background photo menu item', () => {
      const newState = profileReducer(initialState, profileActions.choosePhotosMenuItem(3));

      expect(newState.changePhotosMenu[0].isActive).toBe(false);
      expect(newState.changePhotosMenu[1].isActive).toBe(false);
      expect(newState.changePhotosMenu[2].isActive).toBe(true);
      expect(newState.changePhotosMenuItemId).toBe(3);
    });
  });

  describe('setIsAddPostModalOpen', () => {
    it('should open add post modal', () => {
      const newState = profileReducer(initialState, profileActions.setIsAddPostModalOpen(true));
      expect(newState.isAddPostModalOpen).toBe(true);
    });

    it('should close add post modal', () => {
      let state = profileReducer(initialState, profileActions.setIsAddPostModalOpen(true));
      expect(state.isAddPostModalOpen).toBe(true);

      state = profileReducer(state, profileActions.setIsAddPostModalOpen(false));
      expect(state.isAddPostModalOpen).toBe(false);
    });
  });

  describe('setIsPostModalOpen', () => {
    it('should open post modal', () => {
      const newState = profileReducer(initialState, profileActions.setIsPostModalOpen(true));
      expect(newState.isPostModalOpen).toBe(true);
    });

    it('should close post modal', () => {
      let state = profileReducer(initialState, profileActions.setIsPostModalOpen(true));
      expect(state.isPostModalOpen).toBe(true);

      state = profileReducer(state, profileActions.setIsPostModalOpen(false));
      expect(state.isPostModalOpen).toBe(false);
    });
  });

  describe('changeMembersColumnOpenedStatus', () => {
    it('should toggle members column visibility', () => {
      expect(initialState.isMembersColumnOpen).toBe(true);

      let newState = profileReducer(initialState, profileActions.changeMembersColumnOpenedStatus(false));
      expect(newState.isMembersColumnOpen).toBe(false);

      newState = profileReducer(newState, profileActions.changeMembersColumnOpenedStatus(true));
      expect(newState.isMembersColumnOpen).toBe(true);
    });

    it('should keep members column open by default', () => {
      expect(initialState.isMembersColumnOpen).toBe(true);
    });
  });

  describe('setIsPostTitleEdited', () => {
    beforeEach(() => {
      const postData: PostType[] = [
        {
          id: 1,
          postTitle: 'Test Post',
          postInf: 'Test Information',
          postImg: '',
          likesCount: 0,
          isEditTitle: false,
          isEditPostInf: false,
          owner: 'user1',
          createdAt: '2024-01-01'
        }
      ];
      initialState = { ...initialState, posts: postData };
    });

    it('should set post title edit status to true', () => {
      const newState = profileReducer(
        initialState,
        profileActions.setIsPostTitleEdited({ postId: 1, status: true })
      );

      expect(newState.posts[0].isEditTitle).toBe(true);
    });

    it('should set post title edit status to false', () => {
      let state = profileReducer(
        initialState,
        profileActions.setIsPostTitleEdited({ postId: 1, status: true })
      );
      expect(state.posts[0].isEditTitle).toBe(true);

      state = profileReducer(state, profileActions.setIsPostTitleEdited({ postId: 1, status: false }));
      expect(state.posts[0].isEditTitle).toBe(false);
    });

    it('should only affect the target post', () => {
      const multiPostState = {
        ...initialState,
        posts: [
          ...initialState.posts,
          {
            id: 2,
            postTitle: 'Another Post',
            postInf: 'Another Info',
            postImg: '',
            likesCount: 0,
            isEditTitle: false,
            isEditPostInf: false,
            owner: 'user2',
            createdAt: '2024-01-02'
          }
        ]
      };

      const newState = profileReducer(
        multiPostState,
        profileActions.setIsPostTitleEdited({ postId: 1, status: true })
      );

      expect(newState.posts[0].isEditTitle).toBe(true);
      expect(newState.posts[1].isEditTitle).toBe(false);
    });
  });

  describe('setIsPostInfEdited', () => {
    beforeEach(() => {
      const postData: PostType[] = [
        {
          id: 1,
          postTitle: 'Test Post',
          postInf: 'Test Information',
          postImg: '',
          likesCount: 0,
          isEditTitle: false,
          isEditPostInf: false,
          owner: 'user1',
          createdAt: '2024-01-01'
        }
      ];
      initialState = { ...initialState, posts: postData };
    });

    it('should set post information edit status to true', () => {
      const newState = profileReducer(
        initialState,
        profileActions.setIsPostInfEdited({ postId: 1, status: true })
      );

      expect(newState.posts[0].isEditPostInf).toBe(true);
    });

    it('should set post information edit status to false', () => {
      let state = profileReducer(
        initialState,
        profileActions.setIsPostInfEdited({ postId: 1, status: true })
      );
      expect(state.posts[0].isEditPostInf).toBe(true);

      state = profileReducer(state, profileActions.setIsPostInfEdited({ postId: 1, status: false }));
      expect(state.posts[0].isEditPostInf).toBe(false);
    });
  });

  describe('finishEditing', () => {
    beforeEach(() => {
      const postData: PostType[] = [
        {
          id: 1,
          postTitle: 'Test Post 1',
          postInf: 'Test Information 1',
          postImg: '',
          likesCount: 0,
          isEditTitle: true,
          isEditPostInf: true,
          owner: 'user1',
          createdAt: '2024-01-01'
        },
        {
          id: 2,
          postTitle: 'Test Post 2',
          postInf: 'Test Information 2',
          postImg: '',
          likesCount: 0,
          isEditTitle: true,
          isEditPostInf: false,
          owner: 'user2',
          createdAt: '2024-01-02'
        }
      ];
      initialState = { ...initialState, posts: postData };
    });

    it('should reset all editing flags to false', () => {
      const newState = profileReducer(initialState, profileActions.finishEditing());

      expect(newState.posts[0].isEditTitle).toBe(false);
      expect(newState.posts[0].isEditPostInf).toBe(false);
      expect(newState.posts[1].isEditTitle).toBe(false);
      expect(newState.posts[1].isEditPostInf).toBe(false);
    });
  });

  describe('onPostTitleChange', () => {
    beforeEach(() => {
      const postData: PostType[] = [
        {
          id: 1,
          postTitle: 'Original Title',
          postInf: 'Test Information',
          postImg: '',
          likesCount: 0,
          isEditTitle: false,
          isEditPostInf: false,
          owner: 'user1',
          createdAt: '2024-01-01'
        }
      ];
      initialState = { ...initialState, posts: postData };
    });

    it('should update post title', () => {
      const newState = profileReducer(
        initialState,
        profileActions.onPostTitleChange({ postId: 1, postContent: 'Updated Title' })
      );

      expect(newState.posts[0].postTitle).toBe('Updated Title');
    });

    it('should not affect other posts', () => {
      const multiPostState = {
        ...initialState,
        posts: [
          ...initialState.posts,
          {
            id: 2,
            postTitle: 'Another Title',
            postInf: 'Another Info',
            postImg: '',
            likesCount: 0,
            isEditTitle: false,
            isEditPostInf: false,
            owner: 'user2',
            createdAt: '2024-01-02'
          }
        ]
      };

      const newState = profileReducer(
        multiPostState,
        profileActions.onPostTitleChange({ postId: 1, postContent: 'Updated Title' })
      );

      expect(newState.posts[0].postTitle).toBe('Updated Title');
      expect(newState.posts[1].postTitle).toBe('Another Title');
    });
  });

  describe('onPostInfChange', () => {
    beforeEach(() => {
      const postData: PostType[] = [
        {
          id: 1,
          postTitle: 'Test Title',
          postInf: 'Original Information',
          postImg: '',
          likesCount: 0,
          isEditTitle: false,
          isEditPostInf: false,
          owner: 'user1',
          createdAt: '2024-01-01'
        }
      ];
      initialState = { ...initialState, posts: postData };
    });

    it('should update post information', () => {
      const newState = profileReducer(
        initialState,
        profileActions.onPostInfChange({ postId: 1, postContent: 'Updated Information' })
      );

      expect(newState.posts[0].postInf).toBe('Updated Information');
    });

    it('should not affect other posts', () => {
      const multiPostState = {
        ...initialState,
        posts: [
          ...initialState.posts,
          {
            id: 2,
            postTitle: 'Another Title',
            postInf: 'Another Info',
            postImg: '',
            likesCount: 0,
            isEditTitle: false,
            isEditPostInf: false,
            owner: 'user2',
            createdAt: '2024-01-02'
          }
        ]
      };

      const newState = profileReducer(
        multiPostState,
        profileActions.onPostInfChange({ postId: 1, postContent: 'Updated Information' })
      );

      expect(newState.posts[0].postInf).toBe('Updated Information');
      expect(newState.posts[1].postInf).toBe('Another Info');
    });
  });

  describe('Post Notification', () => {
    it('should have 2 post notifications in initial state', () => {
      expect(initialState.postNotification).toHaveLength(2);
    });

    it('should have Delete Post notification', () => {
      const deleteNotif = initialState.postNotification.find(n => n.name === 'Delete Post');
      expect(deleteNotif).toBeDefined();
      expect(deleteNotif?.id).toBe(1);
    });

    it('should have Edit Post notification', () => {
      const editNotif = initialState.postNotification.find(n => n.name === 'Edit Post');
      expect(editNotif).toBeDefined();
      expect(editNotif?.id).toBe(2);
    });
  });

  describe('Multiple state changes', () => {
    it('should handle multiple sequential actions', () => {
      let state = initialState;

      state = profileReducer(state, profileActions.setIsAddPostModalOpen(true));
      expect(state.isAddPostModalOpen).toBe(true);

      state = profileReducer(state, profileActions.changeMembersColumnOpenedStatus(false));
      expect(state.isMembersColumnOpen).toBe(false);

      state = profileReducer(state, profileActions.changeProfileNavItemChosenStatus(7012));
      expect(state.profileNavigationMenu[0].isChosen).toBe(true);

      state = profileReducer(state, profileActions.choosePhotosMenuItem(2));
      expect(state.changePhotosMenuItemId).toBe(2);
    });
  });
});
