const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')

router.post('/signup', userCtrl.signup) // Route POST pour l'enregistrement
router.post('/login', userCtrl.login) // Route POST pour l'authentification

module.exports = router