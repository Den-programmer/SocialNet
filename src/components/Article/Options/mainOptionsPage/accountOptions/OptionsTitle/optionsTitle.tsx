import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core'

interface IOptionsTitle {
    title: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        borderBottom: '1px solid #D0D0D0',
        width: '100%'
    },
    optionsTitle: {
        color: '#222222',
        fontFamily: 'Poppins, sans-serif'
    }
}))

const OptionsTitle:React.FC<IOptionsTitle> = ({ title }) => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <h2 className={classes.optionsTitle}>{title}</h2> 
        </div>
    )
}

export default OptionsTitle