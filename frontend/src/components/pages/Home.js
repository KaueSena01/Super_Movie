import {useState, useContext, useEffect} from 'react'
import {BsFillPlayCircleFill, BsFillArrowRightCircleFill} from 'react-icons/bs'

import api from '../../utils/api'

import {Link} from 'react-router-dom'

import styles from './Home.module.css'
import LinkButton from '../layout/LinkButton'

import {Context} from '../../context/UserContext'

function Home(){
    const [movies, setMovies] = useState([])
    const {authenticated, logout} = useContext(Context)

    useEffect(() => {
        api.get('/movies').then((response) => {
            setMovies(response.data.movies)
        })
    }, [])

    return(
        <div className={styles.container}>
            <div className={styles.content_header}>
                {authenticated ? 
                <>
                <div>
                <h1>Acompanhe todas as informações de lançamento</h1>
                <h3>Marque algum filme como favorito para acompanhar informações de lançamento!</h3>
                </div>
                <div className={styles.content_actions}>
                <LinkButton text="Favoritos" to="movie/favorites"/>
                </div>
                </>
                :
                <>
                <div>
                <h1>Acompanhe todas as informações de lançamento</h1>
                <h3>Crie uma conta para acompanhar todos os lançamentos!</h3>
                </div>
                <div className={styles.content_actions}>
                <LinkButton text="Login" to="user/login"/>
                <LinkButton text="Cadastrar" to="user/register"/>
                </div>
                </>
                }
            </div>
            {movies.length > 0 && 
                <p className={styles.header_title}>Ultimos lançamentos</p>
            }
            <div className={styles.movie_container}>
            {movies.length > 0 && 
                movies.map((movie) => (
                    <div className={styles.movie_card} key={movie._id}>
                        <Link to={`movie/${movie._id}`}>
                        <div className={styles.card_image}>
                        <p className={styles.average}>{movie.average}</p>
                        <img src={`http://localhost:5000/images/movies/${movie.images[0]}`} />
                        <span class="span">
                        <BsFillPlayCircleFill className={styles.play}/>
                        </span>
                        </div>
                        </Link>
                        <p className={styles.date}>Estreou em: <span className='bold'>{movie.date}</span></p>
                        {movie.title.length > 17 &&
                            <p className={styles.title}>
                                {movie.title.substring(0, 20)+'...'}
                            </p>
                        }
                    </div>
                ))
            }
            {movies.length > 0 &&
                <div className={styles.card_movie_list}>
                    <BsFillArrowRightCircleFill className={styles.icon_expanded_list}/>
                </div>
            }
            {movies.length === 0 &&
                <p style={{color: "#808080"}} >Não há nenhum lançamento!</p>
            }
            </div>
    </div>
    )
}

export default Home