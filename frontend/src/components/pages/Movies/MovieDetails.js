import { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import {MdDateRange} from 'react-icons/md'
import {AiFillStar, AiFillYoutube} from 'react-icons/ai'

import api from '../../../utils/api'

import styles from './MovieDetails.module.css'

import {Context} from '../../../context/UserContext'

import useFlashMessage from '../../../hooks/useFlashMessage'

// flash message

function MovieDetails(){
    const [movie, setMovie] = useState({})
    const {id} = useParams()
    const {authenticated} = useContext(Context)
    const {setFlashMessage} = useFlashMessage()
    const [token] = useState(localStorage.getItem('token' || ''))

    useEffect(() => {
        api.get(`/movies/movie/${id}`).then((response) => {
            setMovie(response.data.movie)
        })
    }, [id])

    async function toAdd(){
        let msgType = 'success'

        const data = await api.patch(`/movies/favorites/${movie._id}`, {
            Headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }    
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })
        
        setFlashMessage(data.message, msgType)
    }

    return(
        <>
         {movie.title && (
             <div className={styles.movie_info}>
             
             <section className={styles.featured} style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${process.env.REACT_APP_API}/images/movies/${movie.images[1]})`
                }}>
                    <div className={styles.featured_vertical}>
                        <div className={styles.featured_horizontal}>
                            <div className={styles.featured_position}>
                            <div className={styles.featured_banner}>
                                <img src={`http://localhost:5000/images/movies/${movie.images[0]}`} />
                            </div>
                            <div className={styles.featured_info}>
                              <div className={styles.featured_title}>{movie.title}</div>
                              <p className={styles.featured_icon}><span className='bold'><MdDateRange className={styles.icon}/></span>{movie.date}</p>
                              <p className={styles.description}>{movie.description.substring(0, 500)+'...'}</p>
                              <p className={styles.tag}>#{movie.title.split(':')[0]}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className={styles.container}>
                    <div className={styles.average}>
                        <div className={styles.stars}>
                        <p className={styles.featured_icon}><span className='bold'><AiFillStar className={styles.star_icon}/></span>{movie.average}<span className={styles.average_fixed}>nota</span></p>
                        </div>
                        <div className={styles.trailer}>
                            <div className={styles.youtube}>
                            <p className={styles.featured_icon}><span className='bold'><AiFillYoutube className={styles.youtube_icon}/></span><a href={`${movie.trailer}?autoplay=1`} target="_blank"><span className={styles.youtube_fixed}>You Tube</span></a></p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.container_trailer}>
                        <div className={styles.play_trailer}>
                            <iframe src={`https://www.youtube.com/embed/${movie.trailer.split('/')[3]}`} 
                            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                            gyroscope; picture-in-picture" allowfullscreen></iframe>
                         </div>
                         <div className={styles.player}>
                            <h3>Adicionar aos favoritos</h3>
                                 {authenticated && 
                                    <button className={styles.button} onClick={toAdd}><span><AiFillStar className={styles.player_icon}/></span>Adicionar</button>
                                 }
                                 {!authenticated && 
                                    <p>Crie uma conta para favoritar algum lançamento</p>
                                 }
                            </div>
                    </div>
                </div>
                </div>
         )}
        </>
    )
}

export default MovieDetails