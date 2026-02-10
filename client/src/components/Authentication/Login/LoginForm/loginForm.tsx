import React from 'react'
import { Form, Input, Button, Checkbox, Typography, Row, Col } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import LoginImg from './LoginImg/loginImg'
import { RegisterFormDataType } from '../../Login/login'

const { Title, Text } = Typography

interface LoginFormPropType {
  isLoadingLogin: boolean
  isLoadingRegistration: boolean
  captcha: string | null
  isRegister: boolean
  setIsRegisterStatus: (status: boolean) => void
  onSubmit: (data: RegisterFormDataType) => void
}

const LoginForm: React.FC<LoginFormPropType> = ({
  isLoadingLogin,
  isLoadingRegistration,
  captcha,
  isRegister,
  setIsRegisterStatus,
  onSubmit
}) => {
  const [form] = Form.useForm<RegisterFormDataType>() 

  const loading = isRegister ? isLoadingRegistration : isLoadingLogin
  return (
    <Row justify="space-around" align="middle" style={{ marginTop: 40 }}>
      <Col xs={22} sm={16} md={12} lg={8}>
        <LoginImg />
      </Col>
      <Col xs={22} sm={16} md={12} lg={8}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
          {isRegister ? 'Register' : 'Login'}
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={values => onSubmit(values)}
          initialValues={{ rememberMe: false }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Email is required' }, { type: 'email', message: 'Enter a valid email' }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              size="large"
              autoComplete="email"
            />
          </Form.Item>

          {isRegister && <Form.Item
            name="username"
            rules={[{ required: true, message: 'Username is required' }, { max: 20, message: 'Max 20 characters' }]}
          >
            <Input placeholder="Username" autoComplete="username" size="large" />
          </Form.Item>
          }

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Password is required' }, { min: 7, message: 'Min 7 characters' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item name="rememberMe" valuePropName="checked">
            <Checkbox>Remember Me</Checkbox>
          </Form.Item>

          {captcha && (
            <>
              <Form.Item>
                <img src={captcha} alt="captcha" style={{ display: 'block', margin: '0 auto 16px' }} />
              </Form.Item>
              <Form.Item
                name="captcha"
                rules={[{ required: true, message: 'Captcha is required' }]}
              >
                <Input placeholder="Enter captcha" size="large" />
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              {isRegister ? 'Register' : 'Login'}
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
            <Text>
              <Text
                strong
                style={{ cursor: 'pointer', color: '#1890ff' }}
              >
                {isRegister ? <span onClick={() => {
                  form.resetFields()
                  setIsRegisterStatus(false)
                }}>Login here</span> : <span onClick={() => {
                  form.resetFields()
                  setIsRegisterStatus(true)
                }}>Register here</span>}
              </Text>
            </Text>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default LoginForm
