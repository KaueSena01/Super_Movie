const router = require('express').Router()

const AdmController = require('../controllers/AdmController')

const checkToken = require('../helpers/verify-token')

router.post('/register', AdmController.register)
router.post('/login', AdmController.login)

module.exports = router