export const canViewPost = (post, viewerId) => {
  if (!post) return false

  const ownerId = post.owner?.toString()
  const viewerIdString = viewerId?.toString()

  console.log("Owner id is: ", ownerId)
  console.log("Viewer id is: ", viewerIdString)

  if(post.visibility === 'public') {
    return true
  } else if (post.visibility === 'private') {
    if(ownerId === viewerIdString) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export const matchesCommentAuthor = (post, viewerIdOrUsername, currentUserId) => {
  if (!post || !Array.isArray(post.comments)) return false

  const subject = viewerIdOrUsername?.toString()
  const currentUserIdString = currentUserId?.toString()

  return post.comments.some((comment) => {
    const commentAuthor = comment?.author?.toString()
    return commentAuthor === subject || commentAuthor === currentUserIdString
  })
}

export const canDeletePost = (post, viewerId) => {
  if (!post || !viewerId) return false

  return post.owner?.toString() === viewerId.toString()
}

export const canDisplayProfilePost = (post, viewerId, profileOwnerId) => {
  if (!post) return false

  const ownerId = post.owner?.toString()
  const profileOwnerIdString = profileOwnerId?.toString()
  const viewerIdString = viewerId?.toString()

  if (ownerId !== profileOwnerIdString) return false
  if (ownerId === viewerIdString) return true

  return post.visibility !== 'private'
}

export const buildPostInteractions = (post, viewerId) => {
  const ownerId = post.owner?.toString()
  const isOwner = viewerId && ownerId === viewerId.toString()
  const likedByViewer = Boolean(post.likedBy?.some((id) => id?.toString() === viewerId?.toString()))

  return {
    ...post,
    likedByViewer,
    canInteract: Boolean(viewerId),
    canDelete: Boolean(isOwner),
    comments: post.comments || [],
    repostsCount: post.repostsCount || 0,
    likesCount: post.likesCount || 0
  }
}
