import classes from './mainOptionsPage.module.css'
import AccountOptions from './accountOptions/accountOptions'

const MainOptionsPage = () => {
    return (
        <div className={classes.mainOptionsPage}>
            <AccountOptions/>
        </div>
    )
}

export default MainOptionsPage