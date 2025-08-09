import classes from './preloader.module.scss'
import preloader from '../../../images/preloader/preloader2.svg'

const Preloader = () =>{
    return (
        <div className={classes.preloader}>
            <img src={ preloader } alt=""/> 
        </div>
    )
}

export default Preloader