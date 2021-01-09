const db = require('./db.js')

const adminSchema = new db.mongoose.Schema({
    "username": { type: String },
    "pass": { type: Number }

})


module.exports = db.mongoose.model("users", adminSchema)