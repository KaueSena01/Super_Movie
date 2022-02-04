import { useContext} from 'react'
import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'

import { Context } from '../../context/UserContext'

function Navbar() {
    const {authenticated, logout} = useContext(Context)

    return (
        <nav className={styles.navbar}>
            <ul>
                <div className={styles.fixed_links}>
                    <li><Link to="/">Lançamentos</Link></li>
                    <li><Link to="/">Sobre</Link></li>
                    <li><Link to="/">API</Link></li>
                </div>
                {authenticated && ( <div className={styles.alternate_links}>
                    <li><Link to="/movie/favorites">Favoritos</Link></li>
                    <li><Link to="/user/profile">Perfil</Link></li>
                    <li onClick={logout}>Sair</li>
                </div> )}
            </ul>
        </nav>
    );
  }
  
  export default Navbar