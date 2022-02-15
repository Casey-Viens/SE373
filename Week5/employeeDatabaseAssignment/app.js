const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const exphbs = require("express-handlebars")
const app = express()
const path = require('path')
var cors = require('cors');
const { Collection } = require('mongoose')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Week5 Assignment Routes
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// GET - api/v1/employees?_sort={-column or column}
// Example Queries
// employees/sort=firstName
// employees/sort=-firstName
// employees/sort=-salary
app.get("/api/v1/employees/sort=:sort", (req, res) => {
    Employee.find().then((employee) => {
        console.log("Sort Route")
        console.log(req.params.sort)
        let direction = req.params.sort.substring(0, 1)
        console.log(direction)
        var column = "";
        if (direction == "-") {
            column = req.params.sort.substring(1)
        } else {
            column = req.params.sort.substring(0)
        }
        employee.sort(function (a, b) {
            //found sort logic from https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/#:~:text=Creating%20a%20Dynamic%20Sorting%20Function
            // was originally using simpler sort logic from stackoverflow but I could not get the descending order to work
            const valueA = (typeof a[column] === 'string')
                ? a[column].toUpperCase() : a[column];
            const valueB = (typeof b[column] === 'string')
                ? b[column].toUpperCase() : b[column];
            console.log(valueA, valueB)
            let comparison = 0;
            if (valueA > valueB) {
                comparison = 1;
            } else if (valueA < valueB) {
                comparison = -1;
            }
            return (
                (direction === '-') ? (comparison * -1) : comparison
            );
        })
        res.json(employee)
    })
})

// GET - api/v1/employees?{column}={value}
// Example Query
// employees/col=department&val=Back%20End
// employees/col=salary&val=50000
// employees/col=firstName&val=Casey
app.get("/api/v1/employees/col=:column&val=:value", (req, res) => {
    console.log("Column Value Route")
    console.log(req.params.column, req.params.value)
    let found = false;
    var employees = [];
    Employee.find().then((employee) => {
        for (e in employee) {
            console.log(employee[e])
            if (employee[e][req.params.column] == req.params.value) {
                found = true;
                employees.push(employee[e])
            }
        }
        if (found == false) {
            res.json({
                "message": "column & value pair not found"
            })
        }else{
            res.json(employees)
        }
    })
})





app.use(express.static(__dirname + "/views"))


app.listen(3000, () => {
    console.log("Listening on port 3000")
})