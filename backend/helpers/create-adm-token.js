const jwt = require('jsonwebtoken')

const createAdmToken = async(adm, req, res) => {

    // create a token
    const token = jwt.sign({
        name: adm.name,
        id: adm._id
    }, "nossosecret")

    // return token
    res.status(200).json({
        message: "Você está autenticado",
        token: token,
        admId: adm._id
    })

}

module.exports = createAdmToken