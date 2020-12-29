import React from "react"
import classes from "./menuItem.module.css"

interface IMenuItem {}

const MenuItem: React.FC<IMenuItem> = (props) => {
    return (
        <div className={classes.menuItem}></div>
    )
}

export default MenuItem