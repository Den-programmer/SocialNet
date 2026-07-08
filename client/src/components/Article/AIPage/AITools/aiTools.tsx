import React, { useState } from 'react'
import { Button, Card, Col, Input, Row, Space, Typography, message } from 'antd'
import { ProfileOutlined, SearchOutlined, HistoryOutlined, ThunderboltOutlined, RobotOutlined } from '@ant-design/icons'
import { useGetChatCompletionMutation } from '../../../../DAL/AI/aiAPI'
import classes from '../aiPage.module.scss'

interface IProps {
  conversationId: string
}

const { Paragraph, Text, Title } = Typography

const toolCards = [
  {
    key: 'profile',
    title: 'Profile snapshot',
    description: 'Ask the AI to inspect your current profile and summarize what it sees.',
    prompt: 'Use getProfile for my current account and give me a concise summary of my profile. Mention anything incomplete or worth improving.',
    icon: <ProfileOutlined />
  },
  {
    key: 'search',
    title: 'Search users',
    description: 'Find people by keyword and ask for a short recommendation list.',
    prompt: 'Use searchUsers with a useful search term for people I might want to connect with, then summarize the best matches and why they are relevant.',
    icon: <SearchOutlined />
  },
  {
    key: 'posts',
    title: 'Recent posts',
    description: 'Pull fresh content from the network and turn it into a quick digest.',
    prompt: 'Use getRecentPosts and summarize the latest posts in a clear, short digest.',
    icon: <HistoryOutlined />
  }
]

const buildToolMessage = (tool: string, args: Record<string, unknown> = {}) => {
  if (tool === 'getProfile') {
    return 'my profile'
  }

  if (tool === 'searchUsers') {
    const term = String(args.term ?? '').trim()

    return term ? `finding users for ${term}` : 'finding users'
  }

  return 'recent posts'
}

const AITools: React.FC<IProps> = ({ conversationId }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [getChatCompletion, { isLoading }] = useGetChatCompletionMutation()

  const runToolShortcut = async (tool: string, args: Record<string, unknown> = {}) => {
    if (!conversationId) {
      message.warning('Create or select a conversation first')
      return
    }

    await getChatCompletion({
      conversationId,
      content: buildToolMessage(tool, args)
    }).unwrap()
  }

  return (
    <div className={classes.aiTools}>
      <Card className={classes.aiToolsHero} variant="borderless">
        <Space orientation="vertical" size={10}>
          <Space align="center" size={10}>
            <ThunderboltOutlined className={classes.aiToolsHeroIcon} />
            <Text className={classes.aiToolsEyebrow}>Tool shortcuts</Text>
          </Space>

          <Title level={4} className={classes.aiToolsTitle}>
            Launch live SocialNet tools from one click
          </Title>

          <Paragraph className={classes.aiToolsDescription}>
            Use the buttons below to ask the assistant to fetch your profile, search users, or summarize recent posts.
          </Paragraph>
        </Space>
      </Card>

      <Row gutter={[16, 16]} className={classes.aiToolsGrid}>
        {toolCards.map(tool => (
          <Col key={tool.key} xs={24} md={8}>
            <Card className={classes.aiToolCard}>
              <Space orientation="vertical" size={14} className={classes.aiToolContent}>
                <Space align="start" size={12}>
                  <div className={classes.aiToolIconWrap}>{tool.icon}</div>
                  <div>
                    <Title level={5} className={classes.aiToolTitle}>
                      {tool.title}
                    </Title>
                    <Text className={classes.aiToolDescription}>
                      {tool.description}
                    </Text>
                  </div>
                </Space>

                <Button
                  type="primary"
                  block
                  icon={<RobotOutlined />}
                  loading={isLoading}
                  onClick={() => {
                    if (tool.key === 'profile') {
                      void runToolShortcut('getProfile')
                      return
                    }

                    if (tool.key === 'search') {
                      void runToolShortcut('searchUsers', {
                        term: searchTerm.trim(),
                        pageSize: 5,
                        currentPage: 1
                      })
                      return
                    }

                    void runToolShortcut('getRecentPosts', {
                      limit: 5
                    })
                  }}
                >
                  Run tool prompt
                </Button>

                {tool.key === 'search' ? (
                  <Input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search by username or keyword"
                    allowClear
                  />
                ) : null}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className={classes.aiToolsHint} variant="borderless">
        <Text>
          The assistant will pick the right tool and return the result in the chat tab.
        </Text>
      </Card>
    </div>
  )
}

export default AITools