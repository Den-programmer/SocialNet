import React from 'react'
import classes from './btn_confirm.module.css'

interface IProps {
    clickFunction: any
}

const Btn_Confirm: React.FC<IProps> = ({clickFunction}) => {
    return <button onClick={clickFunction} className={classes.button}>Confirm</button>
}

export default Btn_Confirm