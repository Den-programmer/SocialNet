import ChangeBiography from "../../components/Article/Options/mainOptionsPage/accountOptions/ChangeBiography/changeBiography"
import ChangeGender from "../../components/Article/Options/mainOptionsPage/accountOptions/ChangeGender/changeGender"
import ChangeMembersColumnStatus from "../../components/Article/Options/mainOptionsPage/accountOptions/ChangeMembersColumnStatus/changeMembersColumnStatus"
import ChangeUserName from "../../components/Article/Options/mainOptionsPage/accountOptions/ChangeUserName/changeUserName"

export const optionsMenuData = (userName: string, gender: string, aboutMe: string, isMembersColumnOpen: boolean) => {
    return [
    {
      id: 1,
      property: 'Nickname',
      value: userName,
      isEditIconActive: false,
      isEdit: false,
      editContent: ChangeUserName
    },
    {
      id: 2,
      property: 'Gender',
      value: gender,
      isEditIconActive: false,
      isEdit: false,
      editContent: ChangeGender
    },
    {
      id: 3,
      property: 'About Me',
      value: aboutMe,
      isEditIconActive: false,
      isEdit: false,
      editContent: ChangeBiography
    },
    {
      id: 4,
      property: 'Members column',
      value: isMembersColumnOpen ? 'opened' : 'closed',
      isEditIconActive: false,
      isEdit: false,
      editContent: ChangeMembersColumnStatus
    }
  ]
}