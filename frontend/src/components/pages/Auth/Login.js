import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.css'
import Input from '../../form/Input'

import {Context} from '../../../context/UserContext'

function Login(){
    const [user, setUser] = useState({})
    const {login} = useContext(Context)

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        login(user)
    }

    return(
        <div  className={styles.form_container}>
            <div className={styles.text_info}>
                <p>Super Movie</p>
                <h1>Faça seu login na plataforma!</h1>
            </div>
            <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                    <Input text="E-mail:" type="email" name="email" placeholder="Digite o seu e-mail" handleOnChange={handleChange}/>
                    <Input text="Senha:" type="password" name="password" placeholder="Digite a sua senha" handleOnChange={handleChange}/>
                    <input type="submit" value="Entrar"/>
                </form>
                <p>Não tem uma conta? <Link to="/user/register" className="bold">Clique aqui</Link></p>
            </div>
        </div>
    )
}

export default Login