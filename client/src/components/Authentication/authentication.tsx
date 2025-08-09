import classes from './authentication.module.css'
import Login from './Login/login'

const Authentication = () => {
    return (
        <div className={classes.authentication}>
            <Login />
        </div>
    )
}

export default Authentication