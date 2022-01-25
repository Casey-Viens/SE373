const express = require("express")
const exphbs = require("express-handlebars")

const app = express()

//Set the view engine
app.engine('hbs', exphbs.engine({
    defaultlayout: 'main',
    extname: '.hbs'
}))

app.set('view engine', 'hbs')

//route to render the page
app.get('/',(req,res)=>{
    res.render('home', {
        posts:[{
            author: "Casey Viens",
            image: "https://picsum.photos/500/500",
            comments: ["comment 1", "comment 2", "comment 3"],
        },
        {
            author:"Jordan D",
            image: "https://picsum.photos/500/500?2",
            comments: [],
        },
        {
            author:"Jon D",
            image: "https://picsum.photos/500/500?3",
            comments: ["Yo, this is awesome", "How'd you do that", "this is the best"],
        }
    ]
        
    })
})

//set up port for connection
app.listen(3000, ()=>{
    console.log("Connected on port 3000")
})