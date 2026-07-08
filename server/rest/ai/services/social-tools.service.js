import mongoose from 'mongoose'
import User from '../../models/user.js'
import Post from '../../models/post.js'

const DEFAULT_PAGE_SIZE = 5
const MAX_PAGE_SIZE = 20
const MAX_RECENT_POSTS = 20

const escapeRegExp = (value = '') => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const getDocumentId = (document) => document?._id?.toString() ?? document?.id ?? ''

const clampInteger = (value, fallback, min, max) => {
    const parsed = Number.parseInt(value, 10)

    if (Number.isNaN(parsed)) {
        return fallback
    }

    return Math.min(max, Math.max(min, parsed))
}

const serializeProfile = (user) => ({
    id: getDocumentId(user),
    username: user.username,
    profile: {
        status: user.profile?.status ?? '',
        aboutMe: user.profile?.aboutMe ?? '',
        contacts: user.profile?.contacts ?? {},
        photos: user.profile?.photos ?? {
            large: '',
            small: ''
        }
    }
})

const serializeUser = (user, currentUser) => ({
    id: getDocumentId(user),
    username: user.username,
    profile: {
        photos: user.profile?.photos ?? {
            large: '',
            small: ''
        },
        status: user.profile?.status ?? ''
    },
    followed: Boolean(currentUser?.following?.some(followedUserId => followedUserId.toString() === getDocumentId(user)))
})

const serializePost = (post) => ({
    id: getDocumentId(post),
    postTitle: post.postTitle,
    postInf: post.postInf,
    postImg: post.postImg,
    likesCount: post.likesCount,
    createdAt: post.createdAt,
    owner: post.owner
        ? {
              id: post.owner.id,
              username: post.owner.username,
              profile: {
                  photos: post.owner.profile?.photos ?? {
                      large: '',
                      small: ''
                  },
                  status: post.owner.profile?.status ?? ''
              }
          }
        : null
})

class SocialToolsService {
    constructor() {
        this.definitions = [
            {
                type: 'function',
                function: {
                    name: 'getProfile',
                    description: 'Get a social network profile by user id.',
                    parameters: {
                        type: 'object',
                        properties: {
                            userId: {
                                type: 'string',
                                description: 'The MongoDB user id. If omitted, the current user profile is used.'
                            }
                        },
                        additionalProperties: false
                    }
                }
            },
            {
                type: 'function',
                function: {
                    name: 'searchUsers',
                    description: 'Search users by username and return paginated results.',
                    parameters: {
                        type: 'object',
                        properties: {
                            term: {
                                type: 'string',
                                description: 'Search text for usernames.'
                            },
                            pageSize: {
                                type: 'integer',
                                description: 'Maximum number of users to return.',
                                minimum: 1,
                                maximum: MAX_PAGE_SIZE
                            },
                            currentPage: {
                                type: 'integer',
                                description: 'Page number to return.',
                                minimum: 1
                            }
                        },
                        additionalProperties: false
                    }
                }
            },
            {
                type: 'function',
                function: {
                    name: 'getRecentPosts',
                    description: 'Get the most recent posts across the social network.',
                    parameters: {
                        type: 'object',
                        properties: {
                            limit: {
                                type: 'integer',
                                description: 'Maximum number of posts to return.',
                                minimum: 1,
                                maximum: MAX_RECENT_POSTS
                            }
                        },
                        additionalProperties: false
                    }
                }
            }
        ]
    }

    getDefinitions() {
        return this.definitions
    }

    parseArguments(args) {
        if (!args) {
            return {}
        }

        if (typeof args === 'object') {
            return args
        }

        if (typeof args === 'string') {
            try {
                return JSON.parse(args)
            } catch {
                return {}
            }
        }

        return {}
    }

    async getProfile({ userId }, { currentUserId } = {}) {
        const resolvedUserId = userId || currentUserId

        if (!resolvedUserId || !mongoose.Types.ObjectId.isValid(resolvedUserId)) {
            return {
                error: 'A valid userId is required.'
            }
        }

        const user = await User.findById(resolvedUserId).lean()

        if (!user) {
            return {
                error: 'User not found.'
            }
        }

        return serializeProfile(user)
    }

    async searchUsers({ term = '', pageSize = DEFAULT_PAGE_SIZE, currentPage = 1 }, { currentUserId } = {}) {
        const safeTerm = String(term).trim()
        const normalizedPageSize = clampInteger(pageSize, DEFAULT_PAGE_SIZE, 1, MAX_PAGE_SIZE)
        const normalizedCurrentPage = clampInteger(currentPage, 1, 1, Number.MAX_SAFE_INTEGER)

        const query = safeTerm
            ? {
                  username: {
                      $regex: escapeRegExp(safeTerm),
                      $options: 'i'
                  }
              }
            : {}

        const [users, totalCount, currentUser] = await Promise.all([
            User.find(query)
                .limit(normalizedPageSize)
                .skip(normalizedPageSize * (normalizedCurrentPage - 1))
                .lean(),
            User.countDocuments(query),
            currentUserId && mongoose.Types.ObjectId.isValid(currentUserId)
                ? User.findById(currentUserId).lean()
                : Promise.resolve(null)
        ])

        return {
            term: safeTerm,
            pageSize: normalizedPageSize,
            currentPage: normalizedCurrentPage,
            totalCount,
            items: users.map(user => serializeUser(user, currentUser))
        }
    }

    async getRecentPosts({ limit = DEFAULT_PAGE_SIZE } = {}) {
        const normalizedLimit = clampInteger(limit, DEFAULT_PAGE_SIZE, 1, MAX_RECENT_POSTS)

        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .limit(normalizedLimit)
            .populate('owner', 'username profile')
            .lean()

        return {
            limit: normalizedLimit,
            items: posts.map(post => serializePost({
                ...post,
                owner: post.owner
                    ? {
                          id: post.owner._id?.toString() ?? post.owner.id,
                          username: post.owner.username,
                          profile: post.owner.profile
                      }
                    : null
            }))
        }
    }

    async execute(toolName, rawArguments = {}, context = {}) {
        const args = this.parseArguments(rawArguments)

        switch (toolName) {
            case 'getProfile':
                return await this.getProfile(args, context)
            case 'searchUsers':
                return await this.searchUsers(args, context)
            case 'getRecentPosts':
                return await this.getRecentPosts(args, context)
            default:
                return {
                    error: `Unknown tool: ${toolName}`
                }
        }
    }
}

export default new SocialToolsService()