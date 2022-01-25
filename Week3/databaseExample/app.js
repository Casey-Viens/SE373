const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())



mongoose.connect('mongodb://localhost:27017/foodEntries', {
    useNewURLParser:true
}).then(()=>{
    console.log("Connected to the Database")
}).catch((err)=>{
    console.log(err)
})

require('./models/Food')

var Food = mongoose.model('food')

//saves the data
app.post('/saveFoodEntry', (req, res)=>{
    console.log(req.body)

    //create new entry for food
    new Food(req.body).save().then(()=>{
        console.log("Data Saved")
        res.redirect("foodlist.html")
    })
})

//reads the data
app.get("/getData", (req,res)=>{
    Food.find().then((food)=>{
        res.json({food})
    })
})

//delete the food
app.post("/deleteFood", (req,res)=>{
    console.log("Food deleted " + req.body._id)

    Food.findByIdAndDelete(req.body._id).exec()
    res.redirect("foodlist.html")
})

/*
//Basic code saving some data
//var Food = mongoose.model("Food", {typeOfFood:String})

var food = new Food({typeOfFood:"Pizza"})

food.save().then(()=>{
    console.log("Food Saved")
})
*/


app.use(express.static(__dirname+"/views"))
app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})