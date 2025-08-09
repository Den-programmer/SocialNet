import { Select, notification } from 'antd'
import { IChangeOptions } from '../accountOptions'
import '../../../options.scss'

const { Option } = Select
// const { Title } = Typography

const ChangeMembersColumnStatus: React.FC<IChangeOptions> = ({
  property,
  isMembersColumnOpen,
  changeMembersColumnOpenedStatus
}) => {
  // const [isSuccessfulSnackbarOpen, setIsSuccessfulSnackbarOpenStatus] = useState(false)

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
          >
            <Option value="opened">opened</Option>
            <Option value="closed">closed</Option>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default ChangeMembersColumnStatus