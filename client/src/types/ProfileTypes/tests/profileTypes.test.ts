import { describe, it, expect } from 'vitest';
import {
  profileType,
  postType,
  contactsType,
  profileNavItem,
  ChangePhotosMenuItemType,
  postNotificationType,
  PostChangingType
} from '../profileTypes';

describe('Profile Types', () => {
  describe('profileType', () => {
    it('should have all required profile properties', () => {
      const profile: profileType = {
        status: 'Hello',
        aboutMe: 'About me',
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
        userId: '123'
      };

      expect(profile).toHaveProperty('status');
      expect(profile).toHaveProperty('aboutMe');
      expect(profile).toHaveProperty('contacts');
      expect(profile).toHaveProperty('photos');
      expect(profile).toHaveProperty('userId');
    });

    it('should allow nullable contact values', () => {
      const profile: profileType = {
        status: 'Hello',
        aboutMe: 'About me',
        contacts: {
          facebook: null,
          website: 'mysite.com',
          vk: null,
          twitter: null,
          instagram: 'instagram.com/user',
          youtube: null,
          github: 'github.com/user',
          mainLink: null
        },
        photos: { large: '', small: '' },
        userId: '123'
      };

      expect(profile.contacts.facebook).toBeNull();
      expect(profile.contacts.website).toBe('mysite.com');
    });

    it('should allow undefined photo values', () => {
      const profile: profileType = {
        status: 'Hello',
        aboutMe: 'About me',
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
        photos: { large: undefined, small: undefined },
        userId: '123'
      };

      expect(profile.photos.large).toBeUndefined();
      expect(profile.photos.small).toBeUndefined();
    });
  });

  describe('contactsType', () => {
    it('should have all contact fields', () => {
      const contacts: contactsType = {
        facebook: 'http://facebook.com/user',
        website: 'http://mywebsite.com',
        vk: 'http://vk.com/user',
        twitter: 'http://twitter.com/user',
        instagram: 'http://instagram.com/user',
        youtube: 'http://youtube.com/user',
        github: 'http://github.com/user',
        mainLink: 'http://mainlink.com'
      };

      expect(Object.keys(contacts)).toHaveLength(8);
      expect(contacts.facebook).toBeDefined();
      expect(contacts.github).toBeDefined();
    });

    it('should allow null values for contacts', () => {
      const contacts: contactsType = {
        facebook: null,
        website: null,
        vk: null,
        twitter: null,
        instagram: null,
        youtube: null,
        github: null,
        mainLink: null
      };

      expect(contacts.facebook).toBeNull();
      expect(contacts.github).toBeNull();
    });

    it('should allow mixed null and string values', () => {
      const contacts: contactsType = {
        facebook: 'http://facebook.com/john',
        website: null,
        vk: 'http://vk.com/john',
        twitter: null,
        instagram: 'http://instagram.com/john',
        youtube: null,
        github: 'http://github.com/john',
        mainLink: null
      };

      expect(contacts.facebook).toBeTruthy();
      expect(contacts.website).toBeNull();
      expect(contacts.vk).toBeTruthy();
    });
  });

  describe('postType', () => {
    it('should have all required post properties', () => {
      const post: postType = {
        id: 1,
        postTitle: 'My First Post',
        postInf: 'Post information',
        postImg: 'image.jpg',
        likesCount: 5,
        isEditTitle: false,
        isEditPostInf: false,
        owner: 'user123',
        createdAt: '2024-01-01'
      };

      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('postTitle');
      expect(post).toHaveProperty('postInf');
      expect(post).toHaveProperty('postImg');
      expect(post).toHaveProperty('likesCount');
      expect(post).toHaveProperty('isEditTitle');
      expect(post).toHaveProperty('isEditPostInf');
      expect(post).toHaveProperty('owner');
      expect(post).toHaveProperty('createdAt');
    });

    it('should accept File as postImg', () => {
      const file = new File(['content'], 'photo.jpg', { type: 'image/jpeg' });
      const post: postType = {
        id: 1,
        postTitle: 'My Post',
        postInf: 'Information',
        postImg: file,
        likesCount: 0,
        isEditTitle: false,
        isEditPostInf: false,
        owner: 'user123',
        createdAt: '2024-01-01'
      };

      expect(post.postImg).toBeInstanceOf(File);
    });

    it('should track edit states', () => {
      const post: postType = {
        id: 1,
        postTitle: 'Title',
        postInf: 'Info',
        postImg: 'image.jpg',
        likesCount: 10,
        isEditTitle: true,
        isEditPostInf: true,
        owner: 'user123',
        createdAt: '2024-01-01'
      };

      expect(post.isEditTitle).toBe(true);
      expect(post.isEditPostInf).toBe(true);
    });
  });

  describe('profileNavItem', () => {
    it('should have required navigation item properties', () => {
      const navItem: profileNavItem = {
        id: 1,
        title: 'Wall',
        isChosen: false,
        path: '/Wall'
      };

      expect(navItem).toHaveProperty('id');
      expect(navItem).toHaveProperty('title');
      expect(navItem).toHaveProperty('isChosen');
      expect(navItem).toHaveProperty('path');
    });

    it('should track chosen state', () => {
      const navItem: profileNavItem = {
        id: 1,
        title: 'Profile',
        isChosen: true,
        path: '/Profile'
      };

      expect(navItem.isChosen).toBe(true);
    });

    it('should support different navigation paths', () => {
      const items: profileNavItem[] = [
        { id: 1, title: 'Wall', isChosen: false, path: '/Wall' },
        { id: 2, title: 'Profile', isChosen: true, path: '/Profile' },
        { id: 3, title: 'Messages', isChosen: false, path: '/Messages' }
      ];

      expect(items[0].path).toBe('/Wall');
      expect(items[1].path).toBe('/Profile');
      expect(items[2].path).toBe('/Messages');
    });
  });

  describe('ChangePhotosMenuItemType', () => {
    it('should have all required menu item properties', () => {
      const menuItem: ChangePhotosMenuItemType = {
        id: 1,
        title: 'Change profile photo',
        isActive: true
      };

      expect(menuItem).toHaveProperty('id');
      expect(menuItem).toHaveProperty('title');
      expect(menuItem).toHaveProperty('isActive');
    });

    it('should support different menu items', () => {
      const items: ChangePhotosMenuItemType[] = [
        { id: 1, title: 'Change profile photo', isActive: true },
        { id: 2, title: 'Delete profile photo', isActive: false },
        { id: 3, title: 'Change background photo', isActive: false }
      ];

      expect(items).toHaveLength(3);
      expect(items[0].isActive).toBe(true);
      expect(items[1].isActive).toBe(false);
    });
  });

  describe('postNotificationType', () => {
    it('should have notification properties', () => {
      const notification: postNotificationType = {
        id: 1,
        name: 'Delete Post'
      };

      expect(notification).toHaveProperty('id');
      expect(notification).toHaveProperty('name');
    });

    it('should support different notification types', () => {
      const notifications: postNotificationType[] = [
        { id: 1, name: 'Delete Post' },
        { id: 2, name: 'Edit Post' }
      ];

      expect(notifications).toHaveLength(2);
      expect(notifications[0].name).toBe('Delete Post');
      expect(notifications[1].name).toBe('Edit Post');
    });
  });

  describe('PostChangingType', () => {
    it('should have post changing properties', () => {
      const changing: PostChangingType = {
        postId: 1,
        postContent: 'Updated content'
      };

      expect(changing).toHaveProperty('postId');
      expect(changing).toHaveProperty('postContent');
      expect(changing.postId).toBe(1);
      expect(changing.postContent).toBe('Updated content');
    });
  });

  describe('Type integrity', () => {
    it('should maintain type structure for complete profile', () => {
      const completeProfile: profileType = {
        status: 'Active',
        aboutMe: 'Hello world',
        contacts: {
          facebook: 'fb.com/user',
          website: 'website.com',
          vk: 'vk.com/user',
          twitter: 'twitter.com/user',
          instagram: 'instagram.com/user',
          youtube: 'youtube.com/user',
          github: 'github.com/user',
          mainLink: 'mainlink.com'
        },
        photos: {
          large: 'large.jpg',
          small: 'small.jpg'
        },
        userId: '12345'
      };

      expect(completeProfile.status).toBe('Active');
      expect(completeProfile.aboutMe).toBe('Hello world');
      expect(completeProfile.photos.large).toBe('large.jpg');
      expect(completeProfile.userId).toBe('12345');
    });

    it('should maintain post array structure', () => {
      const posts: postType[] = [
        {
          id: 1,
          postTitle: 'Post 1',
          postInf: 'Info 1',
          postImg: 'img1.jpg',
          likesCount: 10,
          isEditTitle: false,
          isEditPostInf: false,
          owner: 'user1',
          createdAt: '2024-01-01'
        },
        {
          id: 2,
          postTitle: 'Post 2',
          postInf: 'Info 2',
          postImg: 'img2.jpg',
          likesCount: 20,
          isEditTitle: false,
          isEditPostInf: false,
          owner: 'user1',
          createdAt: '2024-01-02'
        }
      ];

      expect(posts).toHaveLength(2);
      expect(posts[0].id).toBe(1);
      expect(posts[1].likesCount).toBe(20);
    });
  });
});
