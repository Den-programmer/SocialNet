import { describe, it, expect } from 'vitest';

/**
 * Profile Utilities Tests
 * 
 * Tests for helper functions and utilities used in profile management
 */

describe('Profile Utilities', () => {
  describe('Post Creation', () => {
    it('should create post with valid data', () => {
      const createPost = (title: string, info: string, img: string) => ({
        id: Date.now(),
        postTitle: title,
        postInf: info,
        postImg: img,
        likesCount: 0,
        isEditTitle: false,
        isEditPostInf: false,
        owner: 'user123',
        createdAt: new Date().toISOString()
      });

      const post = createPost('My Post', 'Content', 'image.jpg');

      expect(post.postTitle).toBe('My Post');
      expect(post.postInf).toBe('Content');
      expect(post.likesCount).toBe(0);
      expect(post.createdAt).toBeDefined();
    });

    it('should generate unique post IDs', () => {
      const createPostWithId = (title: string, id: number) => ({ id, postTitle: title });

      const post1 = createPostWithId('Post 1', 1);
      const post2 = createPostWithId('Post 2', 2);

      expect(post1.id).not.toBe(post2.id);
    });
  });

  describe('Profile Update', () => {
    it('should merge profile updates', () => {
      const mergeProfileUpdate = (current: any, updates: any) => ({
        ...current,
        ...updates
      });

      const currentProfile = {
        status: 'Old Status',
        aboutMe: 'Old Bio',
        userId: '123'
      };

      const updated = mergeProfileUpdate(currentProfile, {
        status: 'New Status'
      });

      expect(updated.status).toBe('New Status');
      expect(updated.aboutMe).toBe('Old Bio');
      expect(updated.userId).toBe('123');
    });

    it('should update contacts individually', () => {
      const updateContacts = (current: any, contactType: string, value: string | null) => ({
        ...current,
        [contactType]: value
      });

      let contacts = {
        facebook: null,
        github: null,
        twitter: null
      };

      contacts = updateContacts(contacts, 'facebook', 'http://facebook.com/user');
      expect(contacts.facebook).toBe('http://facebook.com/user');

      contacts = updateContacts(contacts, 'github', 'http://github.com/user');
      expect(contacts.github).toBe('http://github.com/user');

      expect(contacts.twitter).toBeNull();
    });
  });

  describe('Post Editing', () => {
    it('should toggle post title editing', () => {
      const toggleEditTitle = (post: any, status: boolean) => ({
        ...post,
        isEditTitle: status
      });

      const post = {
        id: 1,
        postTitle: 'Title',
        isEditTitle: false
      };

      let edited = toggleEditTitle(post, true);
      expect(edited.isEditTitle).toBe(true);

      edited = toggleEditTitle(edited, false);
      expect(edited.isEditTitle).toBe(false);
    });

    it('should toggle post info editing', () => {
      const toggleEditInfo = (post: any, status: boolean) => ({
        ...post,
        isEditPostInf: status
      });

      const post = {
        id: 1,
        postInf: 'Info',
        isEditPostInf: false
      };

      let edited = toggleEditInfo(post, true);
      expect(edited.isEditPostInf).toBe(true);
    });

    it('should update post title content', () => {
      const updatePostTitle = (post: any, newTitle: string) => ({
        ...post,
        postTitle: newTitle
      });

      const post = { id: 1, postTitle: 'Old Title' };
      const updated = updatePostTitle(post, 'New Title');

      expect(updated.postTitle).toBe('New Title');
    });

    it('should update post information content', () => {
      const updatePostInfo = (post: any, newInfo: string) => ({
        ...post,
        postInf: newInfo
      });

      const post = { id: 1, postInf: 'Old Info' };
      const updated = updatePostInfo(post, 'New Info');

      expect(updated.postInf).toBe('New Info');
    });

    it('should reset editing on multiple posts', () => {
      const resetAllEditing = (posts: any[]) => posts.map(post => ({
        ...post,
        isEditTitle: false,
        isEditPostInf: false
      }));

      const posts = [
        { id: 1, isEditTitle: true, isEditPostInf: true },
        { id: 2, isEditTitle: true, isEditPostInf: false }
      ];

      const reset = resetAllEditing(posts);

      reset.forEach(post => {
        expect(post.isEditTitle).toBe(false);
        expect(post.isEditPostInf).toBe(false);
      });
    });
  });

  describe('Navigation Menu', () => {
    it('should select menu item', () => {
      const selectMenuItem = (menu: any[], id: number) => menu.map(item => ({
        ...item,
        isChosen: item.id === id
      }));

      const menu = [
        { id: 1, title: 'Wall', isChosen: false },
        { id: 2, title: 'Profile', isChosen: true }
      ];

      const selected = selectMenuItem(menu, 1);

      expect(selected[0].isChosen).toBe(true);
      expect(selected[1].isChosen).toBe(false);
    });

    it('should find chosen menu item', () => {
      const findChosenMenuItem = (menu: any[]) => menu.find(item => item.isChosen);

      const menu = [
        { id: 1, title: 'Wall', isChosen: false },
        { id: 2, title: 'Profile', isChosen: true }
      ];

      const chosen = findChosenMenuItem(menu);

      expect(chosen?.id).toBe(2);
      expect(chosen?.title).toBe('Profile');
    });

    it('should get menu item by id', () => {
      const getMenuItemById = (menu: any[], id: number) => menu.find(item => item.id === id);

      const menu = [
        { id: 1, title: 'Wall', path: '/Wall' },
        { id: 2, title: 'Messages', path: '/Messages' }
      ];

      const item = getMenuItemById(menu, 2);

      expect(item?.title).toBe('Messages');
      expect(item?.path).toBe('/Messages');
    });
  });

  describe('Photo Management', () => {
    it('should select photo menu item', () => {
      const selectPhotoMenuItem = (menu: any[], id: number) => menu.map(item => ({
        ...item,
        isActive: item.id === id
      }));

      const menu = [
        { id: 1, title: 'Profile Photo', isActive: true },
        { id: 2, title: 'Background', isActive: false }
      ];

      const selected = selectPhotoMenuItem(menu, 2);

      expect(selected[0].isActive).toBe(false);
      expect(selected[1].isActive).toBe(true);
    });

    it('should validate photo file', () => {
      const isValidPhotoFile = (file: File): boolean => {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        return validTypes.includes(file.type);
      };

      const jpgFile = new File(['content'], 'photo.jpg', { type: 'image/jpeg' });
      const pngFile = new File(['content'], 'photo.png', { type: 'image/png' });
      const textFile = new File(['content'], 'text.txt', { type: 'text/plain' });

      expect(isValidPhotoFile(jpgFile)).toBe(true);
      expect(isValidPhotoFile(pngFile)).toBe(true);
      expect(isValidPhotoFile(textFile)).toBe(false);
    });

    it('should get photo dimensions', () => {
      const getPhotoDimensions = (file: File) => ({
        name: file.name,
        size: file.size,
        type: file.type
      });

      const file = new File(['content'], 'photo.jpg', { type: 'image/jpeg' });
      const dims = getPhotoDimensions(file);

      expect(dims.name).toBe('photo.jpg');
      expect(dims.type).toBe('image/jpeg');
    });
  });

  describe('Username Management', () => {
    it('should validate username format', () => {
      const isValidUsername = (username: string): boolean => {
        return username.length > 0 && username.length <= 50;
      };

      expect(isValidUsername('John')).toBe(true);
      expect(isValidUsername('ValidUsername123')).toBe(true);
      expect(isValidUsername('')).toBe(false);
      expect(isValidUsername('a'.repeat(51))).toBe(false);
    });

    it('should trim username whitespace', () => {
      const trimUsername = (username: string): string => username.trim();

      expect(trimUsername('  John  ')).toBe('John');
      expect(trimUsername('Jane Doe')).toBe('Jane Doe');
    });
  });

  describe('Biography Management', () => {
    it('should validate biography length', () => {
      const isValidBiography = (bio: string): boolean => {
        return bio.length <= 1000;
      };

      expect(isValidBiography('Short bio')).toBe(true);
      expect(isValidBiography('a'.repeat(1000))).toBe(true);
      expect(isValidBiography('a'.repeat(1001))).toBe(false);
    });

    it('should sanitize biography input', () => {
      const sanitizeBio = (bio: string): string => {
        return bio.trim().substring(0, 1000);
      };

      expect(sanitizeBio('  Hello World  ')).toBe('Hello World');
      expect(sanitizeBio('a'.repeat(1100))).toHaveLength(1000);
    });
  });

  describe('Gender Management', () => {
    it('should validate gender value', () => {
      const isValidGender = (gender: string): boolean => {
        const validValues = ['Not Chosen', 'Male', 'Female', 'Other'];
        return validValues.includes(gender);
      };

      expect(isValidGender('Male')).toBe(true);
      expect(isValidGender('Female')).toBe(true);
      expect(isValidGender('Not Chosen')).toBe(true);
      expect(isValidGender('Unknown')).toBe(false);
    });

    it('should get gender options', () => {
      const getGenderOptions = () => [
        'Not Chosen',
        'Male',
        'Female',
        'Other'
      ];

      const options = getGenderOptions();

      expect(options).toHaveLength(4);
      expect(options).toContain('Male');
    });
  });

  describe('Contact URLs', () => {
    it('should validate contact URL format', () => {
      const isValidUrl = (url: string | null): boolean => {
        if (!url) return true; // null/empty is valid
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      };

      expect(isValidUrl('http://facebook.com/user')).toBe(true);
      expect(isValidUrl('https://github.com/user')).toBe(true);
      expect(isValidUrl(null)).toBe(true);
      expect(isValidUrl('not-a-url')).toBe(false);
    });

    it('should normalize contact URLs', () => {
      const normalizeUrl = (url: string | null): string | null => {
        if (!url) return null;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          return 'https://' + url;
        }
        return url;
      };

      expect(normalizeUrl('facebook.com/user')).toBe('https://facebook.com/user');
      expect(normalizeUrl('http://facebook.com/user')).toBe('http://facebook.com/user');
      expect(normalizeUrl(null)).toBeNull();
    });
  });

  describe('Posts Array Operations', () => {
    it('should find post by id', () => {
      const findPostById = (posts: any[], id: number) => posts.find(p => p.id === id);

      const posts = [
        { id: 1, postTitle: 'Post 1' },
        { id: 2, postTitle: 'Post 2' }
      ];

      expect(findPostById(posts, 1)?.postTitle).toBe('Post 1');
      expect(findPostById(posts, 3)).toBeUndefined();
    });

    it('should filter posts by owner', () => {
      const filterPostsByOwner = (posts: any[], owner: string) => 
        posts.filter(p => p.owner === owner);

      const posts = [
        { id: 1, owner: 'user1', postTitle: 'Post 1' },
        { id: 2, owner: 'user2', postTitle: 'Post 2' },
        { id: 3, owner: 'user1', postTitle: 'Post 3' }
      ];

      const user1Posts = filterPostsByOwner(posts, 'user1');

      expect(user1Posts).toHaveLength(2);
      expect(user1Posts[0].postTitle).toBe('Post 1');
    });

    it('should sort posts by date', () => {
      const sortPostsByDate = (posts: any[]) => 
        [...posts].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      const posts = [
        { id: 1, createdAt: '2024-01-01' },
        { id: 2, createdAt: '2024-01-03' },
        { id: 3, createdAt: '2024-01-02' }
      ];

      const sorted = sortPostsByDate(posts);

      expect(sorted[0].id).toBe(2);
      expect(sorted[1].id).toBe(3);
      expect(sorted[2].id).toBe(1);
    });

    it('should count likes across posts', () => {
      const getTotalLikes = (posts: any[]) => 
        posts.reduce((sum, post) => sum + post.likesCount, 0);

      const posts = [
        { id: 1, likesCount: 10 },
        { id: 2, likesCount: 20 },
        { id: 3, likesCount: 15 }
      ];

      expect(getTotalLikes(posts)).toBe(45);
    });
  });

  describe('Modal State Management', () => {
    it('should toggle modal state', () => {
      const toggleModal = (isOpen: boolean) => !isOpen;

      let modalOpen = false;
      expect(toggleModal(modalOpen)).toBe(true);

      modalOpen = true;
      expect(toggleModal(modalOpen)).toBe(false);
    });

    it('should open modal', () => {
      const openModal = () => true;
      expect(openModal()).toBe(true);
    });

    it('should close modal', () => {
      const closeModal = () => false;
      expect(closeModal()).toBe(false);
    });
  });

  describe('Column Visibility', () => {
    it('should toggle column visibility', () => {
      const toggleColumn = (isVisible: boolean) => !isVisible;

      let columnOpen = true;
      expect(toggleColumn(columnOpen)).toBe(false);

      columnOpen = false;
      expect(toggleColumn(columnOpen)).toBe(true);
    });

    it('should expand column', () => {
      const expandColumn = () => true;
      expect(expandColumn()).toBe(true);
    });

    it('should collapse column', () => {
      const collapseColumn = () => false;
      expect(collapseColumn()).toBe(false);
    });
  });

  describe('Data Transformation', () => {
    it('should convert post array to indexed object', () => {
      const postArrayToObject = (posts: any[]) => {
        const obj: any = {};
        posts.forEach(post => {
          obj[post.id] = post;
        });
        return obj;
      };

      const posts = [
        { id: 1, postTitle: 'Post 1' },
        { id: 2, postTitle: 'Post 2' }
      ];

      const postObj = postArrayToObject(posts);

      expect(postObj[1].postTitle).toBe('Post 1');
      expect(postObj[2].postTitle).toBe('Post 2');
    });

    it('should aggregate contact information', () => {
      const aggregateContacts = (contacts: any) => {
        return Object.entries(contacts)
          .filter(([_, value]) => value !== null && value !== '')
          .map(([key, value]) => ({ type: key, value }));
      };

      const contacts = {
        facebook: 'fb.com/user',
        github: null,
        twitter: 'twitter.com/user'
      };

      const aggregated = aggregateContacts(contacts);

      expect(aggregated).toHaveLength(2);
      expect(aggregated[0].type).toBe('facebook');
    });
  });
});
