export type AIConversation = {
  _id: string
  title: string
  lastMessage?: string
  updatedAt?: string
}

export type AISearchPost = {
  id: string
  postTitle: string
  postInf: string
  postImg: string
  likesCount: number
  createdAt: string
  owner: {
    id: string
    username: string
    profile: {
      photos: {
        large: string
        small: string
      }
      status: string
    }
  } | null
}


export type AISearchResponse = {
  query: string
  items: AISearchPost[]
}