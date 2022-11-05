const express = require('express')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const router = express.Router()

const stuffCtrl = require('../controllers/stuff')

router.get('/', auth, stuffCtrl.getAllThing)
router.post('/', auth, multer, stuffCtrl.createThing)
router.get('/:id', auth, stuffCtrl.getOneThing)
router.put('/:id', auth, multer, stuffCtrl.updateThing)
router.delete('/:id', auth, stuffCtrl.deleteThing)

module.exports = router
