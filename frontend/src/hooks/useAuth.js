import api from '../utils/api'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useFlashMessage from './useFlashMessage'

export default function useAuth(){
    const [authenticated, setAuthenticated] = useState(false)
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function register(user){
        let msgText = 'Seu cadastro foi realizado!'
        let msgType = 'success'

        try {
            const data = await api.post('/user/register', user).then((response) => {
                return response.data
            })

            await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    async function login(user){
        let msgText = 'Você está autenticado!'
        let msgType = 'success'

        try{
            const data = await api.post('/user/login', user).then((response) => {
                return response.data
            })

            await authUser(data)
        } catch(error){
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    async function authUser(data){
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        navigate('/')
    }

    function logout(){
        const msgText = 'Você saiu da aplicação'
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')

        setFlashMessage(msgText, msgType)
    }

    return { authenticated, register, login, logout}
}