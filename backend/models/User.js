const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator') // On implement le package mongoose-unique-validator

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // unique: true permet de faire enregistrer l'user une fois avec la même adresse mail
  password: { type: String, required: true },
})

userSchema.plugin(uniqueValidator) // On implemente le plugin à notre userSchema

module.exports = mongoose.model('User', userSchema)
