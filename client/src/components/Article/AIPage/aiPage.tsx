import { useAuthRedirect } from "../../../hooks/hooks"
import classes from './aiPage.module.scss'
import { Card, Tabs, Avatar, Row, Col, Typography } from 'antd'
import {
  RobotOutlined,
  MessageOutlined,
  ThunderboltOutlined,
  HistoryOutlined
} from '@ant-design/icons'
import Title from "antd/es/typography/Title"
import AIChatInterface from "./AIChatInterface/aiChatInterface"

const AIPage = () => { 
  useAuthRedirect()
  return (
    <div className={classes.aiPage}>
      <div className={classes.aiHeader}>
        <Row align="middle" gutter={16}>
          <Col>
            <Avatar
              size={96}
              icon={<RobotOutlined />}
              className={classes.aiAvatar}
            />
          </Col>

          <Col>
            <Title level={2} className={classes.aiTitle}>
              AI Assistant
            </Title>
            <Typography className={classes.aiSubtitle}>
              Your personal intelligence layer
            </Typography>
          </Col>
        </Row>
      </div>

      <Card className={classes.aiCard}>
        <Tabs
          defaultActiveKey="chat"
          items={[
            {
              key: 'chat',
              label: 'Chat',
              icon: <MessageOutlined />,
              children: <AIChatInterface />
            },
            {
              key: 'tools',
              label: 'Tools',
              icon: <ThunderboltOutlined />,
              children: <div>AI Tools & Actions</div>
            },
            {
              key: 'history',
              label: 'History',
              icon: <HistoryOutlined />,
              children: <div>Conversation History</div>
            }
          ]}
        />
      </Card>
    </div>
  )
}

export default AIPage