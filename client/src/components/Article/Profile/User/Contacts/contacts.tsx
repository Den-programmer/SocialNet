import React from 'react'
import { contactsType } from '../../../../../types/ProfileTypes/profileTypes'
import { Card, Typography, Row, Col } from 'antd'

const { Title, Text } = Typography

interface IContacts {
  contacts: contactsType | undefined
}

const Contacts: React.FC<IContacts> = React.memo(({ contacts }) => {
  const contactEntries = Object.entries(contacts?contacts:{}).filter(
    ([, value]) => value !== '' && value !== null && value !== undefined
  )

  if (contactEntries.length === 0) return null

  return (
    <Card style={{ margin: '16px 0' }}>
      <Title level={3}>Contacts</Title>
      <Row gutter={[16, 16]}>
        {contactEntries.map(([key, value]) => {
          const contactTitle = key.charAt(0).toUpperCase() + key.slice(1)
          return  <Col span={12} key={key}>
            <Text strong>{contactTitle}:</Text> <Text>{value}</Text>
          </Col>
        })}
      </Row>
    </Card>
  )
})

export default Contacts