const router = require('express').Router()

const UserController = require('../controllers/UserController')

const checkToken = require('../helpers/verify-token')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/', checkToken, UserController.checkUser)
router.patch('/:id', checkToken, UserController.editProfile)

module.exports = router