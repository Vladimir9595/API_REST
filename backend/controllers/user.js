const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.signup = (req, res, next) => {
  // Methode asynchrone pour crypter le mot de passe de l'User à la création du compte
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        pssword: hash,
      })
      user
        .save()
        .then(() => res.status(201).json({ message: 'User créé !' }))
        .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
} // Cette fonction signup créé un user, crypte le mot de passe et enregistre l'user dans la BDD

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      // Vérification si l'user existe ou pas
      if (user === null) {
        res
          .status(401)
          .json({ message: 'Paire identifiant/mot de passe incorrecte' })
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            // Vérifie si le mot de passe est valide et cohérent au hash. Si defferent retourne un message d'erreur
            if (!valid) {
              res.status(401).json({
                message: 'Paire identifiant/mot de passe incorrecte',
              })
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
                  expiresIn: '24h',
                }),
              })
            }
          })
          .catch((error) => res.status(500).json({ error }))
      }
    })
    .catch((error) => res.status(500).json({ error }))
}
