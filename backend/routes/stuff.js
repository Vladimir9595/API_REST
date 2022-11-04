const express = require('express')
const router = express.Router()

const stuffCtrl = require('../controllers/stuff')

router.post('/', stuffCtrl.createThing)

// Permet de créer une route pour Modifier l'objet ou le post avec router.put et Thing.updateOne
router.put('/:id', stuffCtrl.updateThing)

router.delete('/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() =>
      res.status(200).json({ message: 'Objet supprimé avec succes !' }),
    )
    .catch((error) => res.status(400).json({ error }))
})

// Rend le site dynamique on pouvant cliquer sur l'objet et voir les infoirmations
router.get('/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }))
})

router.get('/', (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }))
})

module.exports = router
