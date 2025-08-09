// import { Avatar, Button, Typography, Empty, Row, Col } from 'antd'
// import { NavLink } from 'react-router-dom'
// import { userType } from '../../../../../types/FriendsType/friendsType'
// import styles from '../../FriendsComponents/friendsByButton/Friend/friend.module.scss'
// import { useAppSelector } from '../../../../../hooks/hooks'
// import { selectBlacklist } from '../../../../../BLL/selectors/users-selectors'
// import { deleteFromBlacklist } from '../../../../../BLL/reducer-friends'

// const { useBreakpoint } = Grid
// const { Title } = Typography

// const defaultUserPhoto = import.meta.env.VITE_CLOUDINARY_DEFAULT_USER

const Blacklist = ({  }) => {
    //   const screens = useBreakpoint()
    // const blacklist = useAppSelector(selectBlacklist)
    return (
        <div style={{ minHeight: '100vh', padding: '24px' }}>

            {/* {blacklist.length === 0 ? (
                <Empty description="No users in the blacklist" />
            ) : (
                <Row gutter={[16, 16]}>
                    {blacklist.map(item => {
                        const large = item.profile.photos.large
                        const imageUrl =
                            typeof large === 'string'
                                ? large
                                : large instanceof File
                                    ? URL.createObjectURL(large)
                                    : // @ts-ignore
                                    large?.data && large?.contentType
                                        ? // @ts-ignore
                                        `data:${large.contentType};base64,${Buffer.from(large.data).toString('base64')}`
                                        : defaultUserPhoto

                        return (
                            <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                                <div className={styles.user}>
                                    <NavLink className={styles.navLink} to={`/Profile/${item.id}`}>
                                        <Avatar src={imageUrl || defaultUserPhoto} size={100} />
                                        <Title level={5} className={styles.userName}>{item.username}</Title>
                                    </NavLink>
                                    <Button danger type="primary" onClick={() => deleteFromBlacklist(item.id)}>
                                        Blacked
                                    </Button>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            )} */}
        </div>
    )
}

export default Blacklist