import { describe, it, expect, beforeEach } from 'vitest';
import {
  selectUsersProfile,
  selectPosts,
  selectUsersSmallPhoto,
  selectUsersName,
  selectContacts,
  selectIsUserFollowedStatus,
  selectIsAddPostModalOpenStatus,
  selectIsPostModalOpenStatus,
  selectUserBackground,
  selectProfileNavigationMenu,
  selectBiography,
  selectGender,
  selectChangePhotosMenu,
  selectChangePhotosMenuItemId,
  selectIsMembersColumnOpenedStatus,
} from '../profile-selectors';
import { RootState } from '../../redux';
import { profileType, postType } from '../../../types/ProfileTypes/profileTypes';

describe('Profile Selectors', () => {
  let mockState: RootState;

  beforeEach(() => {
    const mockProfile: profileType = {
      status: 'Hello',
      aboutMe: 'About me text',
      contacts: {
        facebook: 'facebook.com/user',
        website: 'mysite.com',
        vk: 'vk.com/user',
        twitter: 'twitter.com/user',
        instagram: 'instagram.com/user',
        youtube: 'youtube.com/user',
        github: 'github.com/user',
        mainLink: 'mainlink.com'
      },
      photos: {
        large: 'http://example.com/large.jpg',
        small: 'http://example.com/small.jpg'
      },
      userId: '123'
    };

    const mockPosts: postType[] = [
      {
        id: 1,
        postTitle: 'Post 1',
        postInf: 'Information 1',
        postImg: 'img1.jpg',
        likesCount: 10,
        isEditTitle: false,
        isEditPostInf: false,
        owner: 'user123',
        createdAt: '2024-01-01'
      },
      {
        id: 2,
        postTitle: 'Post 2',
        postInf: 'Information 2',
        postImg: 'img2.jpg',
        likesCount: 20,
        isEditTitle: false,
        isEditPostInf: false,
        owner: 'user123',
        createdAt: '2024-01-02'
      }
    ];

    mockState = {
      profilePage: {
        posts: mockPosts,
        username: 'JohnDoe',
        postNotification: [
          { id: 1, name: 'Delete Post' },
          { id: 2, name: 'Edit Post' }
        ],
        profile: mockProfile,
        profileNavigationMenu: [
          { id: 7012, title: 'Wall', isChosen: false, path: '/Wall' },
          { id: 7001, title: 'Profile', isChosen: true, path: '/Profile' },
          { id: 7013, title: 'Notifications', isChosen: false, path: '/Notifications' },
          { id: 7002, title: 'Messages', isChosen: false, path: '/Messages' },
          { id: 7006, title: 'Friends', isChosen: false, path: '/Friends/DataFriends' },
          { id: 7014, title: 'Following', isChosen: false, path: '/' }
        ],
        changePhotosMenu: [
          { id: 1, title: 'Change profile photo', isActive: true },
          { id: 2, title: 'Delete profile photo', isActive: false },
          { id: 3, title: 'Change background photo', isActive: false }
        ],
        changePhotosMenuItemId: 1,
        followed: false,
        background: 'http://example.com/background.jpg',
        gender: 'Male',
        isAddPostModalOpen: false,
        isPostModalOpen: false,
        isMembersColumnOpen: true
      }
    } as unknown as RootState;
  });

  describe('selectUsersProfile', () => {
    it('should select the users profile', () => {
      const profile = selectUsersProfile(mockState);
      expect(profile).toEqual(mockState.profilePage.profile);
    });

    it('should return profile with all contacts', () => {
      const profile = selectUsersProfile(mockState);
      expect(profile.contacts).toBeDefined();
      expect(profile.contacts.facebook).toBe('facebook.com/user');
      expect(profile.contacts.github).toBe('github.com/user');
    });

    it('should return profile with photos', () => {
      const profile = selectUsersProfile(mockState);
      expect(profile.photos).toBeDefined();
      expect(profile.photos.large).toBe('http://example.com/large.jpg');
      expect(profile.photos.small).toBe('http://example.com/small.jpg');
    });
  });

  describe('selectPosts', () => {
    it('should select all posts', () => {
      const posts = selectPosts(mockState);
      expect(posts).toHaveLength(2);
      expect(posts).toEqual(mockState.profilePage.posts);
    });

    it('should return posts in correct order', () => {
      const posts = selectPosts(mockState);
      expect(posts[0].id).toBe(1);
      expect(posts[1].id).toBe(2);
    });

    it('should return posts with all properties', () => {
      const posts = selectPosts(mockState);
      expect(posts[0]).toHaveProperty('postTitle');
      expect(posts[0]).toHaveProperty('postInf');
      expect(posts[0]).toHaveProperty('likesCount');
      expect(posts[0]).toHaveProperty('createdAt');
    });
  });

  describe('selectUsersSmallPhoto', () => {
    it('should select the small photo URL', () => {
      const smallPhoto = selectUsersSmallPhoto(mockState);
      expect(smallPhoto).toBe('http://example.com/small.jpg');
    });

    it('should handle empty small photo', () => {
      const state = {
        ...mockState,
        profilePage: {
          ...mockState.profilePage,
          profile: {
            ...mockState.profilePage.profile,
            photos: { large: 'large.jpg', small: '' }
          }
        }
      };
      const smallPhoto = selectUsersSmallPhoto(state as unknown as RootState);
      expect(smallPhoto).toBe('');
    });
  });

  describe('selectUsersName', () => {
    it('should select the username', () => {
      const username = selectUsersName(mockState);
      expect(username).toBe('JohnDoe');
    });

    it('should return correct username string', () => {
      const username = selectUsersName(mockState);
      expect(typeof username).toBe('string');
    });
  });

  describe('selectContacts', () => {
    it('should select all contacts', () => {
      const contacts = selectContacts(mockState);
      expect(contacts).toBeDefined();
      expect(contacts).toEqual(mockState.profilePage.profile.contacts);
    });

    it('should include all contact types', () => {
      const contacts = selectContacts(mockState);
      expect(contacts).toHaveProperty('facebook');
      expect(contacts).toHaveProperty('website');
      expect(contacts).toHaveProperty('vk');
      expect(contacts).toHaveProperty('twitter');
      expect(contacts).toHaveProperty('instagram');
      expect(contacts).toHaveProperty('youtube');
      expect(contacts).toHaveProperty('github');
      expect(contacts).toHaveProperty('mainLink');
    });
  });

  describe('selectIsUserFollowedStatus', () => {
    it('should return false when user is not followed', () => {
      const followed = selectIsUserFollowedStatus(mockState);
      expect(followed).toBe(false);
    });

    it('should return correct boolean value', () => {
      const state = {
        ...mockState,
        profilePage: { ...mockState.profilePage, followed: true }
      };
      const followed = selectIsUserFollowedStatus(state as unknown as RootState);
      expect(followed).toBe(true);
    });
  });

  describe('selectIsAddPostModalOpenStatus', () => {
    it('should return false when modal is closed', () => {
      const isOpen = selectIsAddPostModalOpenStatus(mockState);
      expect(isOpen).toBe(false);
    });

    it('should return true when modal is open', () => {
      const state = {
        ...mockState,
        profilePage: { ...mockState.profilePage, isAddPostModalOpen: true }
      };
      const isOpen = selectIsAddPostModalOpenStatus(state as unknown as RootState);
      expect(isOpen).toBe(true);
    });
  });

  describe('selectIsPostModalOpenStatus', () => {
    it('should return false when post modal is closed', () => {
      const isOpen = selectIsPostModalOpenStatus(mockState);
      expect(isOpen).toBe(false);
    });

    it('should return true when post modal is open', () => {
      const state = {
        ...mockState,
        profilePage: { ...mockState.profilePage, isPostModalOpen: true }
      };
      const isOpen = selectIsPostModalOpenStatus(state as unknown as RootState);
      expect(isOpen).toBe(true);
    });
  });

  describe('selectUserBackground', () => {
    it('should select user background image URL', () => {
      const background = selectUserBackground(mockState);
      expect(background).toBe('http://example.com/background.jpg');
    });

    it('should handle empty background', () => {
      const state = {
        ...mockState,
        profilePage: { ...mockState.profilePage, background: '' }
      };
      const background = selectUserBackground(state as unknown as RootState);
      expect(background).toBe('');
    });
  });

  describe('selectProfileNavigationMenu', () => {
    it('should select profile navigation menu', () => {
      const menu = selectProfileNavigationMenu(mockState);
      expect(menu).toHaveLength(6);
      expect(menu).toEqual(mockState.profilePage.profileNavigationMenu);
    });

    it('should have Profile item as chosen by default', () => {
      const menu = selectProfileNavigationMenu(mockState);
      const profileItem = menu.find(item => item.title === 'Profile');
      expect(profileItem?.isChosen).toBe(true);
    });

    it('should include Wall, Messages, and Friends items', () => {
      const menu = selectProfileNavigationMenu(mockState);
      const titles = menu.map(item => item.title);
      expect(titles).toContain('Wall');
      expect(titles).toContain('Messages');
      expect(titles).toContain('Friends');
      expect(titles).toContain('Notifications');
      expect(titles).toContain('Following');
    });
  });

  describe('selectBiography', () => {
    it('should select biography/about me text', () => {
      const bio = selectBiography(mockState);
      expect(bio).toBe('About me text');
    });

    it('should handle empty biography', () => {
      const state = {
        ...mockState,
        profilePage: {
          ...mockState.profilePage,
          profile: { ...mockState.profilePage.profile, aboutMe: '' }
        }
      };
      const bio = selectBiography(state as unknown as RootState);
      expect(bio).toBe('');
    });
  });

  describe('selectGender', () => {
    it('should select gender', () => {
      const gender = selectGender(mockState);
      expect(gender).toBe('Male');
    });

    it('should handle different gender values', () => {
      const state = {
        ...mockState,
        profilePage: { ...mockState.profilePage, gender: 'Female' }
      };
      const gender = selectGender(state as unknown as RootState);
      expect(gender).toBe('Female');
    });

    it('should handle "Not Chosen" gender', () => {
      const state = {
        ...mockState,
        profilePage: { ...mockState.profilePage, gender: 'Not Chosen' }
      };
      const gender = selectGender(state as unknown as RootState);
      expect(gender).toBe('Not Chosen');
    });
  });

  describe('selectChangePhotosMenu', () => {
    it('should select change photos menu', () => {
      const menu = selectChangePhotosMenu(mockState);
      expect(menu).toHaveLength(3);
      expect(menu).toEqual(mockState.profilePage.changePhotosMenu);
    });

    it('should have correct menu items', () => {
      const menu = selectChangePhotosMenu(mockState);
      expect(menu[0].title).toBe('Change profile photo');
      expect(menu[1].title).toBe('Delete profile photo');
      expect(menu[2].title).toBe('Change background photo');
    });

    it('should show first item as active by default', () => {
      const menu = selectChangePhotosMenu(mockState);
      expect(menu[0].isActive).toBe(true);
      expect(menu[1].isActive).toBe(false);
      expect(menu[2].isActive).toBe(false);
    });
  });

  describe('selectChangePhotosMenuItemId', () => {
    it('should select the active change photos menu item id', () => {
      const itemId = selectChangePhotosMenuItemId(mockState);
      expect(itemId).toBe(1);
    });

    it('should return correct menu item id', () => {
      const state = {
        ...mockState,
        profilePage: { ...mockState.profilePage, changePhotosMenuItemId: 3 }
      };
      const itemId = selectChangePhotosMenuItemId(state as unknown as RootState);
      expect(itemId).toBe(3);
    });
  });

  describe('selectIsMembersColumnOpenedStatus', () => {
    it('should select members column open status', () => {
      const isOpen = selectIsMembersColumnOpenedStatus(mockState);
      expect(isOpen).toBe(true);
    });

    it('should return false when members column is closed', () => {
      const state = {
        ...mockState,
        profilePage: { ...mockState.profilePage, isMembersColumnOpen: false }
      };
      const isOpen = selectIsMembersColumnOpenedStatus(state as unknown as RootState);
      expect(isOpen).toBe(false);
    });
  });

  describe('Multiple selectors together', () => {
    it('should select profile data with contacts and photos', () => {
      const profile = selectUsersProfile(mockState);
      const contacts = selectContacts(mockState);
      const smallPhoto = selectUsersSmallPhoto(mockState);

      expect(profile).toBeDefined();
      expect(contacts).toBeDefined();
      expect(smallPhoto).toBeDefined();
      expect(contacts).toEqual(profile.contacts);
    });

    it('should select all UI states', () => {
      const addPostOpen = selectIsAddPostModalOpenStatus(mockState);
      const postOpen = selectIsPostModalOpenStatus(mockState);
      const membersOpen = selectIsMembersColumnOpenedStatus(mockState);

      expect(addPostOpen).toBe(false);
      expect(postOpen).toBe(false);
      expect(membersOpen).toBe(true);
    });
  });
});
