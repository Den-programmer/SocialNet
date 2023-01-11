import { createStyles, makeStyles } from '@material-ui/core'
import React from 'react'
import classes from './singleNewsPageContent.module.scss'

interface ISingleNewsPageContent {

}    

const useStyles = makeStyles(() => createStyles({
    newsContentPage: {
        minHeight: '100vh'
    }
}))

const SingleNewsPageContent:React.FC<ISingleNewsPageContent> = (props) => {
    const s = useStyles()
    return (
        <div className={s.newsContentPage}>

        </div>
    )
}

export default SingleNewsPageContent