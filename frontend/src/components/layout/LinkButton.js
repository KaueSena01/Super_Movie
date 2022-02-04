import { Link } from 'react-router-dom'
import styles from './LinkButton.module.css'

function LinkButton({text, to}){
    return(
        <Link to={to}><button className={styles.btn}>{text}</button></Link>
    )
}

export default LinkButton