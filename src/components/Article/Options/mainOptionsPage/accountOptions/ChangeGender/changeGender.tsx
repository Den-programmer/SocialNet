import React, { useState, ChangeEvent } from 'react'
import classes from './changeGender.module.scss'
import { IChangeOptions } from '../accountOptions'
import { createReviewChangesBtn } from '../../../../../../utils/helpers/functions/function-helpers'

const ChangeGender: React.FC<IChangeOptions> = (props) => {
    const select = React.createRef<HTMLSelectElement>()
    const [gender, setGender] = useState<string>('Not Chosen')
    const onGenderChange = (e: ChangeEvent<HTMLSelectElement>) => setGender(e.currentTarget.value)
    const changeGender = (gender: string) => props.changeGender(gender)
    return (
        <div className={classes.changeGender}>
            <div className={classes.changeGender_content}>
                <h5 className={classes.property}>{props.property}</h5>
                <div className={classes.selectList}>
                    <select onChange={onGenderChange} ref={select}>
                        <option value='Not Chosen' selected={gender === 'Not Chosen' && true}>Not Chosen</option>
                        <option value='Male' selected={gender === 'Male' && true}>Male</option>
                        <option value='Female' selected={gender === 'Female' && true}>Female</option>
                    </select>
                </div>
            </div>
            {createReviewChangesBtn(() => changeGender(gender), '/Profile')}
        </div>
    )
}

export default ChangeGender