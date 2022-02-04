import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import api from '../../../utils/api'

import styles from './Favorites.module.css'

import {MdDateRange} from 'react-icons/md'
import {BsFillTrashFill} from 'react-icons/bs'
import {BsArrowRightCircleFill} from 'react-icons/bs'

import useFlashMessage from '../../../hooks/useFlashMessage'

function Favorites(){
    const [movies, setMovies] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        api.get('/movies/favorites').then((response) => {
            setMovies(response.data.movies)
        })
    }, [])

    async function remove(id){
        let msgType = 'success'

        const data = await api.delete(`/movies/favorites/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            const updatedList = movies.filter((movie) => movie._id !== id)
            setMovies(updatedList)
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    return(
        <div className={styles.container}>
            <div className={styles.content_favorite}>
                <h2>Lista de filmes favoritos</h2>
                <div className={styles.favorites}>
                {movies.length > 0 &&
                    movies.map((movie) => (
                        <div className={styles.info_movie}>
                            <div className={styles.banner_and_title}>
                                <div className={styles.banner}>
                                    <img src={`http://localhost:5000/images/movies/${movie.images[0]}`} />
                                </div>
                                <div className={styles.title}>
                                    <h2>{movie.title}</h2>
                                    <p><span className='bold'><MdDateRange className={styles.icon}/></span> {movie.date}</p>
                                </div>
                                <div className={styles.title}>

                                </div>
                            </div>
                            <div className={styles.actions}>
                                <button className={styles.icon} onClick={() => { remove(movie._id) }}><BsFillTrashFill /></button>
                                <Link to={`/movie/${movie._id}`}><button><BsArrowRightCircleFill  className={styles.icon}/></button></Link>
                            </div>
                        </div>
                    ))
                }
                {movies.length === 0 &&
                    <p className={styles.no_movies}>Você não favoritou nenhum filme/lançamento</p>
                }
                </div>
            </div>
        </div>
    )
}

export default Favorites