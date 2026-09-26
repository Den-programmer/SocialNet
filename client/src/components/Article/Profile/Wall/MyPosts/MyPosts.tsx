import React, { useEffect, useMemo } from 'react'
import classes from './MyPosts.module.scss'
import Post from './Post/Post'
import AddPost from './AddPost/addPost'
import { PostType, profileType } from '../../../../../types/ProfileTypes/profileTypes'
import { Input, Typography, Row, Divider } from 'antd'
import { useCreatePostMutation, useGetUsersPostsQuery } from '../../../../../DAL/profileApi'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks'
import { profileActions } from '../../../../../BLL/reducer-profile'
import Preloader from '../../../../common/preloader/preloader'
import { selectAuthorizedUserId } from '../../../../../BLL/selectors/auth-selectors'

interface IMyPosts {
  userName: string
  profileUserId: string
  profile: profileType
  isAddPostModalOpen: boolean
  isPostModalOpen: boolean
}

const { TextArea } = Input
const { Title } = Typography

const MyPosts: React.FC<IMyPosts> = React.memo(props => {
  const {
    userName,
    profileUserId,
    profile,
    isAddPostModalOpen,
    isPostModalOpen
  } = props

  const { setIsAddPostModalOpen, setPostsCount } = profileActions

  const dispatch = useAppDispatch()

  const authorizedUserId = useAppSelector(selectAuthorizedUserId)

  const isOwnProfile = Boolean(authorizedUserId === profileUserId)

  const { data: postsData, isLoading: isPostsLoading } = useGetUsersPostsQuery(profileUserId || '', {
    skip: !profileUserId
  })
  const posts: PostType[] = postsData ? postsData : []

  const groupedPosts = useMemo(() => {
    return {
      ownPosts: posts,
      likedPosts: isOwnProfile ? posts.filter(post => post.likedByViewer) : [],
      commentedPosts: isOwnProfile ? posts.filter(post =>
        Array.isArray(post.comments) && post.comments.some(comment =>
          comment.author?.toString() === authorizedUserId || comment.author === userName
        )
      ) : []
    }
  }, [posts, authorizedUserId, userName, isOwnProfile])

  useEffect(() => {
    dispatch(setPostsCount(posts.length))
  }, [posts.length, dispatch, setPostsCount])

  const [createPost] = useCreatePostMutation()

  const renderPosts = (items: PostType[]) => items.map((post: PostType) => {
    return (
      <Post
        key={post._id}
        post_id={post._id}
        userName={userName}
        postTitle={post.postTitle}
        postInf={post.postInf}
        postImg={post.postImg}
        createdAt={post.createdAt}
        likesCount={post.likesCount}
        avatar={profile.photos.large}
        isModalOpen={isPostModalOpen}
        canDelete={Boolean(post.canDelete && isOwnProfile)}
        visibility={post.visibility}
        likedByViewer={post.likedByViewer}
        canInteract={post.canInteract}
        comments={post.comments}
        repostsCount={post.repostsCount}
      />
    )
  })

  const renderSection = (title: string, items: PostType[]) => {
    if (!items.length) return null

    return (
      <div>
        <Divider>{title}</Divider>
        {renderPosts(items)}
      </div>
    )
  }

  const onAddPost = () => {
    if (!isOwnProfile) return
    dispatch(setIsAddPostModalOpen(true))
  }

  if (isPostsLoading) return <Preloader />

  return (
    <div className={classes.postPage}>
      {isOwnProfile && (
        <div className={classes.addPost}>
          <Row justify="center" className={classes.content}>
            <TextArea
              readOnly
              onClick={onAddPost}
              className={classes.textfield}
              placeholder="What is on your mind?"
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Row>
          {isAddPostModalOpen && (
            <AddPost
              userId={profileUserId}
              addPost={createPost}
            />
          )}
        </div>
      )}
      <div className={classes.posts}>
        {posts.length ? (
          <>
            {renderSection('Posts', groupedPosts.ownPosts)}
            {isOwnProfile && renderSection('Liked posts', groupedPosts.likedPosts)}
            {isOwnProfile && renderSection('Commented posts', groupedPosts.commentedPosts)}
          </>
        ) : (
          <div className={classes.postedNothingBlock}>
            <Title level={4} className={classes.postedNothingTitle}>
              There's no posts yet!
            </Title>
          </div>
        )}
      </div>
    </div>
  )
})

export default MyPosts