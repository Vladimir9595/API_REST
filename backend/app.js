const express = require('express') // C'est la manière dont JS gère les modules. Express gère les routes

const stuffRoutes = require('./routes/stuff')
const userRoutes = require('./routes/user')
const path = require('path')

const mongoose = require('mongoose')

mongoose
  .connect(
    'mongodb+srv://XXX:XXX@cluster0.0m8wbwz.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

app.use(express.json()) // Ce middleware intercepte toutes les rêquetes qui contiennet du json et le met à disposition sur le req.body

// Nous pouvoins également utiliser app.use(bodyParser.json()) au lieu de app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  )
  next()
})

app.use('/api/stuff', stuffRoutes)
app.use('/api/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app // Exportation du module
