const db = require('./db.js')


const staffSchema = new db.mongoose.Schema({
    "username": { type: String },
    "age": { type: Number },
    "sex": { type: String },
    "seniority": { type: Number },
    "hobby": { type: String },
    "married": { type: String },
    "salary": { type: Number }

})

//导出
module.exports = db.mongoose.model('staffapp', staffSchema)