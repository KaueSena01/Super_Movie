const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {
    static async register(req, res){
        const {name, email, password, confirmpassword} = req.body

        if(!name){
            res.status(422).json({message: "O campo nome é obrigatório"})
            return
        }
        if(!email){
            res.status(422).json({message: "O campo e-mail é obrigatório"})
            return
        }
        if(!password){
            res.status(422).json({message: "O campo senha é obrigatório"})
            return
        }
        if(!confirmpassword){
            res.status(422).json({message: "Necessário confirmar a senha"})
            return
        } 
        if(password !== confirmpassword){
            res.status(422).json({message: "As senhas não conferem"})
            return
        }

        // check if user exists
        const userExists = await User.findOne({email : email})

        if(userExists){
            res.status(422).json({message: "Este e-mail já está registrado"})
            return
        }

        // create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // create a user
        const user = new User({
            name,
            email,
            password: passwordHash
        })

        try {
            const newUser = await user.save()
            console.log(newUser)
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({message: error})
    }
    }

    static async login(req, res){
        const {email, password} = req.body

        if(!email){
            res.status(422).json({message: "O campo e-mail é obrigatório"})
            return
        }
        if(!password){
            res.status(422).json({message: "O campo senha é obrigatório"})
            return
        }

        const user = await User.findOne({email : email})

        if(!user){
            res.status(422).json({message: "Não há usuário cadastrado com esse e-mail!"})
            return
        }

        // check if password match with db password
        const checkPassowrd = await bcrypt.compare(password, user.password)
        if(!checkPassowrd){
            res.status(422).json({
                message: "Senha inválida"
            })
            return
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res){
        let currentUser

        if(req.headers.authorization){

            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')
            
            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined

        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async editProfile(req, res){
        const id = req.params.id

        const token = getToken(req)
        const user = await getUserByToken(token)

        const {name, email, password, confirmpassword} = req.body

        // validations
        if(!name){
            res.status(422).json({message: "O campo nome é obrigatório"})
            return
        }

        user.name = name

        if(!email){
            res.status(422).json({message: "O campo e-mail é obrigatório"})
            return
        }

         // check if email exists
         const userExists = await User.findOne({email: email})

         if(user.email !== email && userExists){
             res.status(422).json({
                 message: 'Este e-mail já existe!'
             })
             return
         }
 
         user.email = email
 
         if(password != confirmpassword){
             res.status(422).json({message: "As senhas não conferem"})
             return
         } else if(password === confirmpassword && password != null){
             const salt = await bcrypt.genSalt(12)
             const passwordHash = await bcrypt.hash(password, salt)
 
             user.password = passwordHash
         }

         try {
            // return user updated data
            await User.findOneAndUpdate(
                {_id: user._id},
                { $set: user },
                { new: true}
            )
            res.status(200).json({message: 'Usuário atualizado com sucesso!'})
        } catch (error) {
            res.status(500).json({message: err})
            return
        }
    }
}