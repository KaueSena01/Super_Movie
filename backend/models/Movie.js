const mongoose = require('../db/conn')
const { Schema } = mongoose

const Movie = mongoose.model(
    'Movie',
    new Schema({
        title: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            required: true
        },
        trailer: {
            type: String,
        },
        description: {
            type: String,
            required: true
        },
        average: {
            type: Number,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        user: Object,
        favoritesMovies: Object
    }, { timestamps: true })
)

module.exports = Movie
