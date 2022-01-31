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
}))

app.set('view engine', 'hbs')


mongoose.connect('mongodb://localhost:27017/Empl', {
    useNewURLParser: true
}).then(() => {
    console.log("Connected to the Database")
}).catch((err) => {
    console.log(err)
})

require('./models/Employee')

var Employee = mongoose.model('employee')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/index', (req, res) => {
    res.render('index')
})

app.get('/view', (req, res) => {
    Employee.find().lean().then((employee) => {
        console.log(employee)
        res.render('view', { employee: employee })
    })
})

app.get('/delete', (req, res) => {
    res.render('delete')
})

app.get('/update', (req, res) => {
    res.render('update')
})



//saves the data
app.post('/saveEmployee', (req, res) => {
    console.log(req.body)

    //create new employee
    new Employee(req.body).save().then(() => {
        console.log("Data Saved")
        res.redirect("view")
    })
})

//reads the data
app.get("/getEmployees", (req, res) => {
    Employee.find().then((employee) => {
        res.json({ employee })
    })
})

app.post("/updateEmployee", (req, res) => {
    console.log("Employee found " + req.body._id)
    Employee.findById(req.body._id).lean().exec().then((employee) => {
        console.log({ employee: employee })
        res.render("update", { employee: employee })
    })
})

app.post('/updateEmployeeData', (req, res) => {
    console.log(req.body)
    Employee.findByIdAndUpdate(req.body._id, { "firstName": req.body.firstName, "lastName": req.body.lastName, "department": req.body.department, "startDate": req.body.startDate, "jobTitle": req.body.jobTitle, "salary": req.body.salary }).then(() => {
        console.log("Data Updated")
        res.redirect("view")
    })
})

//delete the employee
app.post("/deleteEmployee", (req, res) => {
    console.log("Employee deleted " + req.body._id)
    Employee.findByIdAndDelete(req.body._id).lean().exec().then((employee) => {
        console.log({ employee: employee })
        res.render("delete", { employee: employee })
    })
})





app.use(express.static(__dirname + "/views"))


app.listen(3000, () => {
    console.log("Listening on port 3000")
})