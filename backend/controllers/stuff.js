const Thing = require('../models/Thing')
const fs = require('fs')

exports.getAllThing = (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }))
}

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing)
  delete thingObject._id
  delete thingObject._userId // On utilise le token d'authentification
  const thing = new Thing({
    ...thingObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.gest('host')}/images/${
      req.file.filename
    }`,
  })
  thing
    .save()
    .then(() => {
      res.status(201).json({ message: 'Objet enregistré !' })
    })
    .catch((error) => res.status(400).json({ error }))
  //   delete req.body._id
  //   const thing = new Thing({
  //     ...req.body,
  //   })
  //   thing
  //     .save()
  //     // Fonctions asynchrone = async function - JavaScript fonctions promise
  //     .then(() => res.status(201).json({ message: 'Objet enregistré !' })) // Fonction flachée - envoie la réponse code ok 200
  //     .catch((error) => res.status(400).json({ error })) // Envoie l'erreur 400
}

// Rend le site dynamique en pouvant cliquer sur l'objet et voir les infoirmations
exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }))
}

exports.updateThing = (req, res, next) => {
  const thingObject = req.file
    ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.gest('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }
  delete thingObject._userId
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      if (thing.userId != req.auth.userId) {
        res.status((401).json({ message: 'Non autorisé' }))
      } else {
        Thing.updateOne(
          { _id: req.params.id },
          { ...thingObject, _id: req.params.id },
        )
          .then(() => {
            res.status(201).json({ message: 'Objet modifié !' })
          })
          .catch((error) => res.status(401).json({ error }))
      }
    })
    .catch((error) => {
      res.status(400).json({ error })
    })

  //   Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  //     .then(() =>
  //       res.status(200).json({ message: 'Objet modifié avec succes !!' }),
  //     )
  //       .catch(() => res.status(400).json({ error }))
}

exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      if (thing.userId != req.auth.userId) {
        res.status((401).json({ message: 'Non autorisé' }))
      } else {
        const filename = thing.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          Thing.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(201).json({ message: 'Objet supprimé !' })
            })
            .catch((error) => res.status(401).json({ error }))
        })
      }
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
  //   Thing.deleteOne({ _id: req.params.id })
  //     .then(() =>
  //       res.status(200).json({ message: 'Objet supprimé avec succes !' }),
  //     )
  //     .catch((error) => res.status(400).json({ error }))
}
