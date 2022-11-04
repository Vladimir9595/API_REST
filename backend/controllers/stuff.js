const Thing = require('../models/Thing')

exports.createThing = (req, res, next) => {
  delete req.body._id
  const thing = new Thing({
    ...req.body,
  })
  thing
    .save()
    // Fonctions asynchrone = async function - JavaScript fonctions promise
    .then(() => res.status(201).json({ message: 'Objet enregistré !' })) // Fonction flachée - envoie la réponse code ok 200
    .catch((error) => res.status(400).json({ error })) // Envoie l'erreur 400
}

exports.updateThing = (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() =>
      res.status(200).json({ message: 'Objet modifié avec succes !!' }),
    )
    .catch(() => res.status(400).json({ error }))
}