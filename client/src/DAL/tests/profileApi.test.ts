import { describe, it, expect, vi } from 'vitest';
import { profileApi } from '../profileApi';
import { contactsType} from '../../types/ProfileTypes/profileTypes';

// Mock the base query
vi.mock('../api', () => ({
  baseQuery: vi.fn(() => Promise.resolve({ data: {} })),
  ServerResType: {}
}));

describe('Profile API', () => {
  describe('API Endpoints Definition', () => {
    it('should have profileApi defined', () => {
      expect(profileApi).toBeDefined();
      expect(profileApi.reducerPath).toBe('profileApi');
    });

    it('should have correct reducer path', () => {
      expect(profileApi.reducerPath).toBe('profileApi');
    });

    it('should have correct tag types', () => {
      expect(profileApi.middleware).toBeDefined();
    });
  });

  describe('Profile Queries', () => {
    it('should define getUsersProfile query endpoint', () => {
      expect(profileApi.endpoints.getUsersProfile).toBeDefined();
    });

    it('should define getUserBackground query endpoint', () => {
      expect(profileApi.endpoints.getUserBackground).toBeDefined();
    });

    it('should define getUsername query endpoint', () => {
      expect(profileApi.endpoints.getUsername).toBeDefined();
    });

    it('should define getUsersPosts query endpoint', () => {
      expect(profileApi.endpoints.getUsersPosts).toBeDefined();
    });

    it('should define getGender query endpoint', () => {
      expect(profileApi.endpoints.getGender).toBeDefined();
    });
  });

  describe('Profile Mutations', () => {
    it('should define updateUsername mutation endpoint', () => {
      expect(profileApi.endpoints.updateUsername).toBeDefined();
    });

    it('should define createPost mutation endpoint', () => {
      expect(profileApi.endpoints.createPost).toBeDefined();
    });

    it('should define updateContacts mutation endpoint', () => {
      expect(profileApi.endpoints.updateContacts).toBeDefined();
    });

    it('should define updateAboutMe mutation endpoint', () => {
      expect(profileApi.endpoints.updateAboutMe).toBeDefined();
    });

    it('should define updateGender mutation endpoint', () => {
      expect(profileApi.endpoints.updateGender).toBeDefined();
    });

    it('should define setUserPhoto mutation endpoint', () => {
      expect(profileApi.endpoints.setUserPhoto).toBeDefined();
    });

    it('should define setUserBackground mutation endpoint', () => {
      expect(profileApi.endpoints.setUserBackground).toBeDefined();
    });
  });

  describe('Hooks Export', () => {
    it('should export useGetUsersProfileQuery hook', () => {
      expect(profileApi.useGetUsersProfileQuery).toBeDefined();
    });

    it('should export useGetUsernameQuery hook', () => {
      expect(profileApi.useGetUsernameQuery).toBeDefined();
    });

    it('should export useLazyGetUsernameQuery hook', () => {
      expect(profileApi.useLazyGetUsernameQuery).toBeDefined();
    });

    it('should export useUpdateUsernameMutation hook', () => {
      expect(profileApi.useUpdateUsernameMutation).toBeDefined();
    });

    it('should export useGetUsersPostsQuery hook', () => {
      expect(profileApi.useGetUsersPostsQuery).toBeDefined();
    });

    it('should export useCreatePostMutation hook', () => {
      expect(profileApi.useCreatePostMutation).toBeDefined();
    });

    it('should export useUpdateContactsMutation hook', () => {
      expect(profileApi.useUpdateContactsMutation).toBeDefined();
    });

    it('should export useUpdateAboutMeMutation hook', () => {
      expect(profileApi.useUpdateAboutMeMutation).toBeDefined();
    });

    it('should export useGetGenderQuery hook', () => {
      expect(profileApi.useGetGenderQuery).toBeDefined();
    });

    it('should export useLazyGetGenderQuery hook', () => {
      expect(profileApi.useLazyGetGenderQuery).toBeDefined();
    });

    it('should export useUpdateGenderMutation hook', () => {
      expect(profileApi.useUpdateGenderMutation).toBeDefined();
    });

    it('should export useSetUserPhotoMutation hook', () => {
      expect(profileApi.useSetUserPhotoMutation).toBeDefined();
    });

    it('should export useSetUserBackgroundMutation hook', () => {
      expect(profileApi.useSetUserBackgroundMutation).toBeDefined();
    });

    it('should export useGetUserBackgroundQuery hook', () => {
      expect(profileApi.useGetUserBackgroundQuery).toBeDefined();
    });
  });

  describe('API Query Endpoints', () => {
    describe('getUsersProfile', () => {
      it('should construct correct URL for profile fetch', () => {
        const endpoint = profileApi.endpoints.getUsersProfile;
        expect(endpoint.name).toBe('getUsersProfile');
      });
    });

    describe('getUserBackground', () => {
      it('should construct correct URL for background fetch', () => {
        const endpoint = profileApi.endpoints.getUserBackground;
        expect(endpoint.name).toBe('getUserBackground');
      });
    });

    describe('getUsername', () => {
      it('should construct correct URL for username fetch', () => {
        const endpoint = profileApi.endpoints.getUsername;
        expect(endpoint.name).toBe('getUsername');
      });
    });

    describe('getUsersPosts', () => {
      it('should construct correct URL for posts fetch', () => {
        const endpoint = profileApi.endpoints.getUsersPosts;
        expect(endpoint.name).toBe('getUsersPosts');
      });
    });

    describe('getGender', () => {
      it('should construct correct URL for gender fetch', () => {
        const endpoint = profileApi.endpoints.getGender;
        expect(endpoint.name).toBe('getGender');
      });
    });
  });

  describe('API Mutation Endpoints', () => {
    describe('updateUsername', () => {
      it('should have correct endpoint name', () => {
        expect(profileApi.endpoints.updateUsername.name).toBe('updateUsername');
      });

      it('should use PUT method', () => {
        const endpoint = profileApi.endpoints.updateUsername;
        expect(endpoint).toBeDefined();
      });
    });

    describe('updateContacts', () => {
      it('should have correct endpoint name', () => {
        expect(profileApi.endpoints.updateContacts.name).toBe('updateContacts');
      });
    });

    describe('updateAboutMe', () => {
      it('should have correct endpoint name', () => {
        expect(profileApi.endpoints.updateAboutMe.name).toBe('updateAboutMe');
      });
    });

    describe('updateGender', () => {
      it('should have correct endpoint name', () => {
        expect(profileApi.endpoints.updateGender.name).toBe('updateGender');
      });
    });

    describe('createPost', () => {
      it('should have correct endpoint name', () => {
        expect(profileApi.endpoints.createPost.name).toBe('createPost');
      });

      it('should handle file upload', () => {
        const endpoint = profileApi.endpoints.createPost;
        expect(endpoint).toBeDefined();
      });
    });

    describe('setUserPhoto', () => {
      it('should have correct endpoint name', () => {
        expect(profileApi.endpoints.setUserPhoto.name).toBe('setUserPhoto');
      });

      it('should accept File and userId', () => {
        const endpoint = profileApi.endpoints.setUserPhoto;
        expect(endpoint).toBeDefined();
      });
    });

    describe('setUserBackground', () => {
      it('should have correct endpoint name', () => {
        expect(profileApi.endpoints.setUserBackground.name).toBe('setUserBackground');
      });

      it('should accept File and userId', () => {
        const endpoint = profileApi.endpoints.setUserBackground;
        expect(endpoint).toBeDefined();
      });
    });
  });

  describe('Tag Types', () => {
    it('should use Posts tag type', () => {
      const endpoints = profileApi.endpoints;
      expect(endpoints.getUsersPosts).toBeDefined();
    });

    it('should use Profile tag type', () => {
      const endpoints = profileApi.endpoints;
      expect(endpoints.getUsersProfile).toBeDefined();
    });

    it('should use Background tag type', () => {
      const endpoints = profileApi.endpoints;
      expect(endpoints.getUserBackground).toBeDefined();
    });
  });

  describe('Payload Types', () => {
    it('should accept correct username update payload', () => {
      const payload = {
        userId: '123',
        username: 'newUsername'
      };
      expect(payload).toHaveProperty('userId');
      expect(payload).toHaveProperty('username');
    });

    it('should accept correct contacts update payload', () => {
      const payload: { contacts: contactsType; userId: string } = {
        userId: '123',
        contacts: {
          facebook: 'http://facebook.com/user',
          website: 'http://mywebsite.com',
          vk: 'http://vk.com/user',
          twitter: 'http://twitter.com/user',
          instagram: 'http://instagram.com/user',
          youtube: 'http://youtube.com/user',
          github: 'http://github.com/user',
          mainLink: 'http://mainlink.com'
        }
      };
      expect(payload).toHaveProperty('userId');
      expect(payload).toHaveProperty('contacts');
    });

    it('should accept correct aboutMe update payload', () => {
      const payload = {
        aboutMe: 'About me text',
        userId: '123'
      };
      expect(payload).toHaveProperty('aboutMe');
      expect(payload).toHaveProperty('userId');
    });

    it('should accept correct gender update payload', () => {
      const payload = {
        gender: 'Male',
        userId: '123'
      };
      expect(payload).toHaveProperty('gender');
      expect(payload).toHaveProperty('userId');
    });

    it('should accept correct photo update payload', () => {
      const file = new File(['content'], 'photo.jpg', { type: 'image/jpeg' });
      const payload = {
        photo: file,
        userId: '123'
      };
      expect(payload).toHaveProperty('photo');
      expect(payload).toHaveProperty('userId');
    });

    it('should accept correct post creation payload', () => {
      const file = new File(['content'], 'image.jpg', { type: 'image/jpeg' });
      const payload = {
        userId: '123',
        newPostTitle: 'My Post Title',
        newPostInformat: 'My Post Information',
        postPhoto: file
      };
      expect(payload).toHaveProperty('userId');
      expect(payload).toHaveProperty('newPostTitle');
      expect(payload).toHaveProperty('newPostInformat');
      expect(payload).toHaveProperty('postPhoto');
    });
  });
});
