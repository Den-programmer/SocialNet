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
  const [form] = Form.useForm()
  const [triggerUsers] = useLazyGetUsersQuery()

  const handleSearch = () => {
    const searchTerm = form.getFieldValue('term') || ''
    dispatch(setUsersTerm(searchTerm))
    triggerUsers({ pageSize, currentPage, term: searchTerm })
    setTimeout(() => scrollToTop(400), 250)
  }

  return (
    <Row justify="center" style={{ margin: '16px 0' }}>
      <Col xs={22} sm={20} md={16} lg={12} xl={10}>
        <Form layout="inline" form={form} initialValues={{ term }}>
          <Form.Item name="term" style={{ flexGrow: 1 }}>
            <Input placeholder="Search for friends" allowClear />
          </Form.Item>
          <Form.Item>
            <Button onClick={handleSearch} type="primary">
              Search
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default SearchNewFriends