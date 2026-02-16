import React, { useState, ChangeEvent, useMemo } from 'react'
import { Input, Typography, Button, message, Space, Alert } from 'antd'
import { DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { ICurrentContact } from '../../../contactsOptions'
import { useContactsEditor } from '../../../../../../../../BLL/hooks/useContactsEditor'
import { sanitizeUrl, PLATFORM_HINTS } from '../../../../../../../../utils/validators/validators'

const { Title, Text } = Typography

interface IChangeContact {
  id: number
  property: string
  value: string | null
  currentPageUrl: string
  currentContacts: Array<ICurrentContact>
  setCurrentContacts: (array: Array<ICurrentContact>) => void
}

const ChangeContact: React.FC<IChangeContact> = props => {
  const [currentContact, setCurrentContact] = useState(props.value || '')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const { validateContact, saveContact } = useContactsEditor()

  const error = useMemo(() => {
    return validateContact(props.property, currentContact)
  }, [currentContact, props.property, validateContact])

  const onContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentContact(e.target.value)
  }



  const saveChanges = async () => {
    if (!currentContact.trim()) {
      await updateLocalState(null)
      return
    }

    if (error) {
      message.error(error)
      return
    }

    try {
      setIsLoading(true)
      const sanitized = sanitizeUrl(currentContact)

      if (!sanitized) {
        message.error('Invalid URL format. Please check your input')
        return
      }

      await saveContact(props.property, sanitized)
      await updateLocalState(sanitized)
      
      setShowSuccess(true)
      message.success('Contact updated')
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (err) {
      message.error('Failed to update contact. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const updateLocalState = async (sanitized: string | null) => {
    const updatedArray = props.currentContacts.map(item =>
      item.id === props.id
        ? { ...item, value: sanitized, isEdit: false }
        : { ...item, isEdit: false }
    )
    props.setCurrentContacts(updatedArray)
  }

  return (
    <div className="editContentItem" style={{ width: '100%', padding: '16px', backgroundColor: '#fafafa', borderRadius: '8px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Title level={4} style={{ margin: '0 0 8px 0', color: '#262626', textTransform: 'capitalize' }}>
          {props.property}
        </Title>
        <Text type="secondary" style={{ fontSize: '12px' }}>
          {PLATFORM_HINTS[props.property.toLowerCase()] || 'Enter your social media profile URL'}
        </Text>
      </div>

      {showSuccess && (
        <Alert
          message="Contact updated successfully!"
          type="success"
          showIcon
          icon={<CheckCircleOutlined />}
          style={{ marginBottom: '12px', borderRadius: '4px' }}
          closable
        />
      )}

      <Space direction="vertical" style={{ width: '100%', gap: '8px' }}>
        <Input
          value={currentContact}
          onChange={onContactChange}
          status={error ? 'error' : ''}
          placeholder={`https://...`}
          size="large"
          allowClear
          style={{
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ borderRadius: '4px', marginTop: '4px' }}
          />
        )}

        <Space style={{ width: '100%', justifyContent: 'flex-end', gap: '8px' }}>
          <Button
            danger
            type="default"
            onClick={() => {
              setCurrentContact('')
              setShowSuccess(false)
            }}
            icon={<DeleteOutlined />}
            style={{ borderRadius: '4px' }}
          >
            Clear
          </Button>
          <Button
            type="primary"
            onClick={saveChanges}
            disabled={!!error || props.currentPageUrl !== '/Options/contacts' || !currentContact.trim()}
            loading={isLoading}
            style={{ borderRadius: '4px', minWidth: '120px' }}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Space>
      </Space>
    </div>
  )
}

export default ChangeContact