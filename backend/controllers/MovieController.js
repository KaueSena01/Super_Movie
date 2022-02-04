const Movie = require('../models/Movie')

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class MovieController{
    static async getAllMovies(req, res){
        const movies = await Movie.find().sort('-createdAt')
        res.status(200).json({
            movies: movies
        })
    }

    static async getMovie(req, res){
        const id = req.params.id

        const movie = await Movie.findOne({_id: id})

        if(!movie){
            res.status(404).json({message: 'Filme não encontrado!'})
            return
        }

        res.status(200).json({movie})
    }

    static async favoritesMovies(req, res){
        const id = req.params.id

        const movie = await Movie.findOne({_id: id})

        if(!movie){
            res.status(404).json({message: 'Filme não encontrado!'})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        movie.favoritesMovies = {
            _id: user._id
        }

        await Movie.findByIdAndUpdate(id, movie)

        res.status(200).json({message: 'Filme adicionado a minha lista de favoritos!'})

    }

    static async getAllUserMovie(req, res){
        const token = getToken(req)
        const user = await getUserByToken(token)

        const movies = await Movie.find({'favoritesMovies._id': user._id}).sort('-createdAt')

        res.status(200).json({
            movies
        })
    }

    static async removeFavoritesMovies(req, res){
        const id = req.params.id

        const movie = await Movie.findOne({_id: id})

        if(!movie){
            res.status(404).json({message: 'Filme não encontrado!'})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        movie.favoritesMovies = {
            _id: ''
        }

        await Movie.findByIdAndUpdate(id, movie)

        res.status(200).json({message: 'Você removeu um filme da sua lista de favoritos!'})
    }

    static async createMovie(req, res){
        const {title, trailer, description, average, date} = req.body

        const images = req.files

        if(!title){
            res.status(422).json({message: "O título do filme é obrigatório!"})
            return
        }
        if(!description){
            res.status(422).json({message: "A descrição do filme é obrigatória!"})
            return
        }
        if(!average){
            res.status(422).json({message: "A nota do filme é obrigatória!"})
            return
        }
        if(!date){
            res.status(422).json({message: "A data do filme é obrigatória!"})
            return
        }
        if(images.length === 0){
            res.status(422).json({message: "As imagens do filme são obrigatórias!"})
            return
        }else if(images.length !== 2){
            res.status(422).json({message: "É necessário que seja adicionado duas imagens!"})
            return
        }

        const movieExists = await Movie.findOne({title : title})

        if(movieExists){
            res.status(422).json({message: "Este filme já existe"})
            return
        }

        const movie = new Movie({
            title,
            images: [],
            trailer,
            description,
            average,
            date,
        })

        images.map((image) => {
            movie.images.push(image.filename)
        })

        try {
            const newMovie = await movie.save()
            res.status(201).json({
                message: 'Filme adicionado com sucesso!',
                newMovie
            })
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async editMovie(req, res){
        const id = req.params.id

        const {title, trailer, description, average, date} = req.body

        const images = req.files

        const updatedData = {}

        updatedData.trailer = trailer

        const movie = await Movie.findOne({_id: id})

        if(!movie){
            res.status(404).json({message: 'Filme não encontrado!'})
            return
        }

        if(!title){
            res.status(422).json({message: "O nome do filme é obrigatório!"})
            return
        } else{
            updatedData.title = title
        }

        if(!description){
            res.status(422).json({message: "A descrição do filme é obrigatória!"})
            return
        } else{
            updatedData.description = description
        }

        if(!average){
            res.status(422).json({message: "A nota do filme é obrigatória!"})
            return
        } else{
            updatedData.average = average
        }

        if(!date){
            res.status(422).json({message: "A data do filme é obrigatória!"})
            return
        } else{
            updatedData.date = date
        }

        if(images.length > 0){
            updatedData.images = []
            images.map((image) => {
                updatedData.images.push(image.filename)
            })
        }

        await Movie.findByIdAndUpdate(id, updatedData)
        res.status(200).json({message: 'Filme atualizado!'})
    }

    static async deleteMovie(req, res){
        const id = req.params.id

        const movie = await Movie.findOne({_id: id})

        if(!movie){
            res.status(404).json({message: 'Filme não encontrado!'})
            return
        }

        await Movie.findByIdAndDelete(id)
        res.status(200).json({message: 'Você acabou de deletar um filme!'})
    }
}