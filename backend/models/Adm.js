const mongoose = require('../db/conn')
const { Schema } = mongoose

const Adm = mongoose.model(
    'Adm',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }, { timestamps: true })
)

module.exports = Adm
