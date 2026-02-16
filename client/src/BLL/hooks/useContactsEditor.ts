import { useAppSelector } from '../../hooks/hooks'
import { selectContacts } from '../selectors/profile-selectors'
import { selectAuthorizedUserId } from '../selectors/auth-selectors'
import { useUpdateContactsMutation } from '../../DAL/profileApi'
import { useAddNotificationMutation } from '../../DAL/notificationApi'
import { socialsValidatorsMap, sanitizeUrl } from '../../utils/validators/validators'
import { contactsType } from '../../types/ProfileTypes/profileTypes'

export const useContactsEditor = () => {
  const contacts = useAppSelector(selectContacts) || {}
  const userId = useAppSelector(selectAuthorizedUserId) || ''
  const [updateContacts] = useUpdateContactsMutation()
  const [createNotification] = useAddNotificationMutation()

  const validateContact = (property: string, value: string): string => {
    const validator = socialsValidatorsMap[
      property.toLowerCase() as keyof typeof socialsValidatorsMap
    ]

    if (!validator) {
      return `Unsupported contact type: ${property}`
    }

    if (!value.trim()) {
      return ''
    }

    const sanitized = sanitizeUrl(value)
    if (sanitized === null) {
      return 'Invalid URL format. Please enter a valid social media profile URL'
    }

    return validator(sanitized) || ''
  }

  const saveContact = async (property: string, value: string | null) => {
    const sanitized = value?.trim() ? sanitizeUrl(value) : null

    if (sanitized === null && value?.trim()) {
      throw new Error('Invalid URL format')
    }

    const updatedContacts: contactsType = {
      ...contacts,
      [property]: sanitized
    }

    await updateContacts({ contacts: updatedContacts, userId })

    createNotification({
      title: 'Your contacts have been changed successfully!',
      pageUrl: '/Profile',
      itemType: 'Profile'
    })
  }

  return {
    contacts,
    validateContact,
    saveContact
  }
}
