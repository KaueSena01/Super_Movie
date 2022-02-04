import styles from './Footer.module.css'

function Footer(){
    return(
        <footer className={styles.footer}>
            <p><span className='bold'>Super Movie</span> &copy; 2022</p>
            <p>Made by: <span className='bold'>Kauê Sena</span></p>
        </footer>
    )
}

export default Footer