import React from 'react'
import { Form, Input, Button, Row, Col } from 'antd'
import { useAppDispatch } from '../../../../../../hooks/hooks'
import { setUsersTerm } from '../../../../../../BLL/reducer-friends'
import { scrollToTop } from '../../../../../../utils/helpers/functions/function-helpers'
import { useLazyGetUsersQuery } from '../../../../../../DAL/usersApi'

interface SearchNewFriendsProps {
   pageSize: number
   currentPage: number
   term: string
}

const SearchNewFriends: React.FC<SearchNewFriendsProps> = ({ pageSize, currentPage, term }) => {
  const dispatch = useAppDispatch() 
  const onFinish = (values: { term: string }) => {
    dispatch(setUsersTerm(values.term))
    setTimeout(() => scrollToTop(400), 250)
  }
  const [triggerUsers] = useLazyGetUsersQuery()

  return (
    <Row justify="center" style={{ margin: '16px 0' }}>
      <Col xs={22} sm={20} md={16} lg={12} xl={10}>
        <Form layout="inline" onFinish={onFinish} initialValues={{ term }}>
          <Form.Item name="term" rules={[{ required: true, message: 'Please enter a search term' }]} style={{ flexGrow: 1 }}>
            <Input placeholder="Search for friends" allowClear />
          </Form.Item>
          <Form.Item>
            <Button onClick={() => triggerUsers({pageSize, currentPage, term})} type="primary">
              Search
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default SearchNewFriends