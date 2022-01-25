const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FoodSchema = new Schema({
    food:{
        type:String,
        required:true
    }
})

mongoose.model('food', FoodSchema)