const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    author:String,
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5
    },
    reviewText:String,
    createdOn:{
        type:Date,
        "default":Date.now
    }
})

let Review = mongoose.model('Review', reviewSchema)

module.exports = Review