const Adm = require('../models/Adm')
const bcrypt = require('bcrypt')


const createAdmToken = require('../helpers/create-adm-token')

module.exports = class AdmController {
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

        // check if adm exists
        const admExists = await Adm.findOne({email : email})

        if(admExists){
            res.status(422).json({message: "Este e-mail já existe"})
            return
        }

        // create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // create a adm
        const user = new Adm({
            name,
            email,
            password: passwordHash
        })

        try {
            const newAdm = await user.save()
            console.log(newAdm)
            await createAdmToken(newAdm, req, res)
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

        const adm = await Adm.findOne({email : email})

        if(!adm){
            res.status(422).json({message: "Não há usuário cadastrado com esse e-mail!"})
            return
        }

        // check if password match with db password
        const checkPassowrd = await bcrypt.compare(password, adm.password)
        if(!checkPassowrd){
            res.status(422).json({
                message: "Senha inválida"
            })
            return
        }

        await createAdmToken(adm, req, res)
    }
}