const mongoose = require('mongoose')
const Schema = mongoose.Schema

let adminSchema = new Schema({
    email: String,
    password: String,
    name: String
})

adminSchema.statics.createInstance = function(email, password, name){
    return new this({
        email: email,
        password: password,
        name: name
    })
}

adminSchema.statics.findByEmail = function(email, cb){
    return this.findOne({email: email}, cb)
}

adminSchema.statics.add = function(aAdmin, cb){
    this.create(aAdmin, cb)
}

module.exports = mongoose.model('Admin', adminSchema) 