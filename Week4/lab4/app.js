const express = require("express")
const exphbs = require("express-handlebars")
const hbs = require("handlebars")
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

//Set the view engine
app.engine('hbs', exphbs.engine({
    defaultlayout: 'main',
    extname: '.hbs',
    helpers: {
        colorTable(size) {
            var string = ""
            var color;
            string += "<table><tbody>"
            for (let i = 0; i < size; i++) {
                string += "<tr>"
                for (let k = 0; k < size; k++) {
                    color = ((1 << 24) * Math.random() | 0).toString(16)
                    string += `<td style="background-color: #${color}">${color}<br/><span style="color: #ffffff">${color}</span></td>`
                }
                string += "</tr>"
            }
            string += "</tbody></table>"
            return new hbs.SafeString(string)
        },
        error404() {
            var classes = ["shrink", "rotate", "still"]
            var classNum = 0
            var divNum = Math.random() * (50 - 20) + 20
            var string = ""
            for (let i = 0; i < divNum; i++) {
                classNum = Math.floor(Math.random() * 3)
                string += `<div class='${classes[classNum]}'>404</div>`
            }
            return new hbs.SafeString(string)
        },
    }
}))

app.set('view engine', 'hbs')


app.get('/', (req, res) => {
    res.render('index', { gridOptions: [3, 4, 5, 10, 20] })
})

app.post('/createGrid', (req, res) => {
    res.render('index', {
        gridOptions: [3, 4, 5, 10, 20],
        size: req.body.gridSize
    })
})

app.use(express.static(__dirname + "/views"))

app.use(function (req, res, next) {
    res.status(404).render('error')
})

//set up port for connection
app.listen(3000, () => {
    console.log("Connected on port 3000")
})