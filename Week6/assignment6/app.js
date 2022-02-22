const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const exphbs = require("express-handlebars")
const app = express()
const path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())


app.engine('hbs', exphbs.engine({
    defaultlayout: 'main',
    extname: '.hbs',
    helpers: {
        json(contact) {
            return JSON.stringify(contact);
        }
    }
}))

app.set('view engine', 'hbs')

mongoose.connect('mongodb://localhost:27017/Empl', {
    useNewURLParser: true
}).then(() => {
    console.log("Connected to the Database")
}).catch((err) => {
    console.log(err)
})

require('./models/Contact')

var Contact = mongoose.model('contact')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/index', (req, res) => {
    res.render('index')
})

app.get('/view', (req, res) => {
    Contact.find().lean().then((contact) => {
        console.log(contact)
        res.render('view', { contact: contact })
    })
})

app.post('/saveContact', (req, res) => {
    console.log(req.body)

    //create new contact
    new Contact(req.body).save().then(() => {
        console.log("Contact Saved")
        res.render("index", { name: req.body.name })
    })
})

app.use(express.static(__dirname + "/views"))

app.listen(3000, () => {
    console.log("Listening on port 3000")
})