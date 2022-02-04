const router = require('express').Router()

const MovieController = require('../controllers/MovieController')

const checkToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.get('/', MovieController.getAllMovies)
router.get('/favorites', checkToken, MovieController.getAllUserMovie)
router.patch('/favorites/:id', checkToken, MovieController.favoritesMovies)
router.delete('/favorites/:id', checkToken, MovieController.removeFavoritesMovies)
router.post('/movie', checkToken, imageUpload.array('images'), MovieController.createMovie)
router.get('/movie/:id', MovieController.getMovie)
router.patch('/movie/:id',  checkToken, imageUpload.array('images'), MovieController.editMovie)
router.delete('/movie/:id',  checkToken, MovieController.deleteMovie)

module.exports = router