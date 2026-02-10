import React, { useEffect } from 'react'
import classes from './MyPosts.module.scss'
import Post from './Post/Post'
import AddPost from './AddPost/addPost'
import { PostType, profileType } from '../../../../../types/ProfileTypes/profileTypes'
import { Input, Typography, Row, Col } from 'antd'
import { useCreatePostMutation, useGetUsersPostsQuery } from '../../../../../DAL/profileApi'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks'
import { profileActions } from '../../../../../BLL/reducer-profile'
import Preloader from '../../../../common/preloader/preloader'
import { selectAuthorizedUserId } from '../../../../../BLL/selectors/auth-selectors'

interface IMyPosts {
  userName: string
  userId: string | undefined
  profile: profileType
  isAddPostModalOpen: boolean
  isPostModalOpen: boolean
}

const { TextArea } = Input
const { Title } = Typography

const MyPosts: React.FC<IMyPosts> = React.memo(props => {
  const {
    userName,
    userId,
    profile,
    isAddPostModalOpen,
    isPostModalOpen
  } = props

  const { setIsAddPostModalOpen, setPostsCount } = profileActions
  
  const dispatch = useAppDispatch()

  const authorizedUserId = useAppSelector(selectAuthorizedUserId)

  const idToLoad = userId || authorizedUserId

  const { data: postsData, isLoading: isPostsLoading } = useGetUsersPostsQuery(idToLoad!)
  const posts = postsData || []

  useEffect(() => {
    if (postsData) {
      dispatch(setPostsCount(postsData.length))
    }
  }, [postsData, dispatch, setPostsCount])

  const [createPost] = useCreatePostMutation()
  
  const renderedPosts = posts.map((post: PostType) => {  
    return <Post
      key={post.id}
      id={post.id}
      _id={post._id}
      userName={userName}
      postTitle={post.postTitle}
      postInf={post.postInf}
      postImg={post.postImg}
      createdAt={post.createdAt}
      likesCount={post.likesCount}
      avatar={profile.photos.large}
      isModalOpen={isPostModalOpen}
    />
  })

  const onAddPost = () => dispatch(setIsAddPostModalOpen(true))

  if (isPostsLoading) return <Preloader />

  return (
    <div className={classes.postPage}>
      <div className={classes.addPost}>
        <Row justify="center" className={classes.content}>
          <Col span={16}>
            <TextArea
              readOnly
              onClick={onAddPost}
              className={classes.textfield}
              placeholder="What is on your mind?"
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Col>
        </Row>
        {isAddPostModalOpen && (
          <AddPost
            userId={userId}
            addPost={createPost}
          />
        )}
      </div>
      <div className={classes.posts}>
        {renderedPosts?.length ? (
          renderedPosts
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