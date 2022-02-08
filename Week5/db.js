const mongoose = require('mongoose')
const debug = require('debug')('demo')
const dbURI = 'mongodb://localhost/Reviews'
/*
if(process.env.NODE_ENV === 'production'){
    dbURI = process.env.MONGOLAB_URI;
}*/

mongoose.connect(dbURI, {
    useNewURLParser:true,
    useUnifiedTopology:true

}).then(()=>{
    console.log("Connected to the Database")
}).catch((err)=>{
    console.log(err)
})


mongoose.Promise = Promise

mongoose.connection.on('connected', ()=>{
    debug('Connected to ' + dbURI)
})

mongoose.connection.on('error', (err)=>{
    debug('Connected to ' + err)
    process.exit(0)
})

mongoose.connection.on('disconnected', ()=>{
    debug('Mongoose Disconnected')
})

process.on('exit', code =>{
    debug("About to exit with code", code)
})
