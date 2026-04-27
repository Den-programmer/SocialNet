import { Select, notification } from 'antd'
import { IChangeOptions } from '../accountOptions'
import '../../../options.scss'

// const { Title } = Typography

const ChangeMembersColumnStatus: React.FC<IChangeOptions> = ({
  property,
  isMembersColumnOpen,
  changeMembersColumnOpenedStatus
}) => {
  // const [isSuccessfulSnackbarOpen, setIsSuccessfulSnackbarOpenStatus] = useState(false)

  const statusOptions = [
    { value: 'opened', label: 'opened' },
    { value: 'closed', label: 'closed' }
  ]

  const handleChange = (value: string) => {
    const newState = value === 'opened'
    changeMembersColumnOpenedStatus(newState)
    // setIsSuccessfulSnackbarOpenStatus(true)

    notification.success({
      message: 'Update Successful',
      description: `Members column status has been set to "${value}"`,
      placement: 'bottomRight'
    })
  }

  return (
    <div className="editContentItem">
      <div className="editContentItem_main">
        <h5 className="editContentItem_property">{property}</h5>
        <div style={{ width: 400 }}>
          <Select
            style={{ width: 120 }}
            value={isMembersColumnOpen ? 'opened' : 'closed'}
            onChange={handleChange}
            options={statusOptions}
          />
        </div>
      </div>
    </div>
  )
}

export default ChangeMembersColumnStatus