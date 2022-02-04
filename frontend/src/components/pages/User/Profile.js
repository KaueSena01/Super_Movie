import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

import api from '../../../utils/api'

import styles from '../../form/Form.module.css'

import Input from '../../form/Input'

import useFlashMessage from '../../../hooks/useFlashMessage'

function Profile() {
    const [user, setUser] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage() 

    useEffect(() => {
        api.get('/user', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data)
        })
    }, [token])

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()

        let msgType = 'success'

        const data = await api.patch(`/user/${user._id}`, user ,{
            headers: {
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
        <div  className={styles.form_container}>
            <div className={styles.text_info}>
                <p>Super Movie</p>
                <h1>Aqui você pode editar seu perfil!</h1>
            </div>
            <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                    <Input text="Nome:" type="text" name="name" placeholder="Digite o seu nome" handleOnChange={handleChange} value={user.name}/>
                    <Input text="E-mail:" type="email" name="email" placeholder="Digite o seu e-mail" handleOnChange={handleChange} value={user.email}/>
                    <Input text="Senha:" type="password" name="password" placeholder="Digite a sua senha" handleOnChange={handleChange}/>
                    <Input text="Confirmação de senha:" type="password" name="confirmpassword" placeholder="Confirme a sua senha" handleOnChange={handleChange}/>
                    <input type="submit" value="Salvar"/>
                </form>
                <p><Link to="/" className="bold">Voltar</Link></p>
            </div>
        </div>
    )
}

export default Profile