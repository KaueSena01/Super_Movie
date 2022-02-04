import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.css'
import Input from '../../form/Input'

import { Context } from '../../../context/UserContext'

function Register(){
    const [user, setUser] = useState({})
    const {register} = useContext(Context)

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        register(user)
    }

    return(
        <div  className={styles.form_container}>
            <div className={styles.text_info}>
                <p>Super Movie</p>
                <h1>Faça seu registro na plataforma!</h1>
            </div>
            <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                    <Input text="Nome:" type="text" name="name" placeholder="Digite o seu nome" handleOnChange={handleChange}/>
                    <Input text="E-mail:" type="email" name="email" placeholder="Digite o seu e-mail" handleOnChange={handleChange}/>
                    <Input text="Senha:" type="password" name="password" placeholder="Digite a sua senha" handleOnChange={handleChange}/>
                    <Input text="Confirmação de senha:" type="password" name="confirmpassword" placeholder="Confirme a sua senha" handleOnChange={handleChange}/>
                    <input type="submit" value="Cadastrar"/>
                </form>
                <p>Já tem conta? <Link to="/user/login" className="bold">Clique aqui</Link></p>
            </div>
        </div>
    )
}

export default Register