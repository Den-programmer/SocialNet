import React, { useState, ChangeEvent } from 'react'
import { IChangeOptions, IAccountOption } from '../accountOptions'
import classes from './changeBiography.module.scss'
import { createReviewChangesBtn } from '../../../../../../utils/helpers/functions/function-helpers'

const ChangeBiography:React.FC<IChangeOptions> = (props) => {
    let aboutMeInf = props.aboutMe ? props.aboutMe : ''
    const [aboutMe, setAboutMe] = useState<string>(aboutMeInf)
    const onEditInputChange = (e: ChangeEvent<HTMLInputElement>) => setAboutMe(e.currentTarget.value)
    const changeAboutMeInformation = (aboutMe: string) => {
        props.saveAboutMe(aboutMe)
        let array = props.accountOptionsMenu.map((item: IAccountOption) => {
            return { ...item, isEdit: false }
        })
        props.setChangesToAccountOptionsMenu(array)
    }
    return (
        <div className={classes.changeBiography}>
            <div className={classes.changeBiography_content}>
                <h5 className={classes.property}>{props.property}</h5>
                <div className={classes.editInputWrapper}>
                    <input onChange={onEditInputChange} value={aboutMe} className={classes.editInput} type="text"/>
                </div>
            </div>
            {createReviewChangesBtn(() => changeAboutMeInformation(aboutMe), '/Profile')}
        </div>
    )
}

export default ChangeBiography