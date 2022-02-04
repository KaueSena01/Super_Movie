const express = require('express')
const cors = require('cors')

const app = express()

const Adm = require('./models/Adm')

// const db = require('./db/conn')

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Public folder for images
app.use(express.static('public'))

const AdmRoutes = require('./routes/AdmRoutes') 
const MovieRoutes = require('./routes/MovieRoutes')
const UserRoutes = require('./routes/UserRoutes')

app.use(express.json())
app.use('/adm', AdmRoutes)
app.use('/movies', MovieRoutes)
app.use('/user', UserRoutes)

app.listen(5000)