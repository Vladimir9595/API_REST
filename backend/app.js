const express = require('express') // C'est la manière dont JS gère les modules. Express gère les routes

// const Thing = require('./models/Thing')

const stuffRoutes = require('./routes/stuff')

const mongoose = require('mongoose')

mongoose
  .connect(
    'mongodb+srv://Vlad:Vladimir67@cluster0.0m8wbwz.mongodb.net/?retryWrites=true&w=majority',
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

app.use('/api/stuff/', stuffRoutes)

// app.post('/api/stuff/', (req, res, next) => {
//   delete req.body._id
//   const thing = new Thing({
//     ...req.body,
//   })
//   thing
//     .save()
//     // Fonctions asynchrone = async function - JavaScript fonctions promise
//     .then(() => res.status(201).json({ message: 'Objet enregistré !' })) // Fonction flachée - envoie la réponse code ok 200
//     .catch((error) => res.status(400).json({ error })) // Envoie l'erreur 400
// })

// // Permet de créer une route pour Modifier l'objet ou le post avec app.put et Thing.updateOne
// app.put('/api/stuff/:id', (req, res, next) => {
//   Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//     .then(() =>
//       res.status(200).json({ message: 'Objet modifié avec succes !!' }),
//     )
//     .catch(() => res.status(400).json({ error }))
// })

// app.delete('/api/stuff/:id', (req, res, next) => {
//   Thing.deleteOne({ _id: req.params.id })
//     .then(() =>
//       res.status(200).json({ message: 'Objet supprimé avec succes !' }),
//     )
//     .catch((error) => res.status(400).json({ error }))
// })

// // Rend le site dynamique on pouvant cliquer sur l'objet et voir les infoirmations
// app.get('/api/stuff/:id', (req, res, next) => {
//   Thing.findOne({ _id: req.params.id })
//     .then((things) => res.status(200).json(things))
//     .catch((error) => res.status(400).json({ error }))
// })

// app.get('/api/stuff/', (req, res, next) => {
//   Thing.find()
//     .then((things) => res.status(200).json(things))
//     .catch((error) => res.status(400).json({ error }))
// })

module.exports = app // Exportation du module
