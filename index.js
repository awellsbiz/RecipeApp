// require packages
require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cryptoJS = require('crypto-js')
const db = require('./models')

//app configs 
const app = express()
const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')

//middlewares
//parse html from request bodies
app.use(express.urlencoded({extended:false}))
//tells express to parse incoming cookies sent from browser
app.use(cookieParser)
app.use((req, res, next) => {
        //incomming request console logger
        console.log(`[${new Date().toLocaleString()}]: ${req.method} ${req.url}`)
        console.log('request body:', req.body)
        //send data downstream to the other routes
        //res.locals.myData = 'hi 👋🏾'
    next()// tells express that this middle ware has been finished
})
//custom auth middleware
app.use(async (req,res, next) => {
    try{
        //check if there is a cookie
        if (req.cookies.userId) {

            //if so we will decrypt the cookie and lookup the user using their PK
            const decryptedPk = cryptoJS.AES.decrypt(req.cookies.userId, process.env.ENC_KEY)
            const decryptedPkString = decryptedPk.toString(cryptoJS.enc.Utf8)
            const user = await db.user.findByPk(decryptedPkString)//eager loading can be done here
            //mount the found user in the res.locals
            //in all other routes you can assume that the res.locals.user is the currently logged in user
            res.locals.user = user
            //res.locasl.user.addPet({})
        }else {
            //if there is no cookie, set res.locals.user to be null
            res.locals.user = null
        }
    }catch(err){
        console.log(err)
        //if something goes wrong
        //set the user in the res.locals to be null
        res.locals.user = null
    } finally {
        //runs regarless wether ther was an erroe or not
        next() //go to the next thing no matter what
    }
})

//routes and controllers
app.get('/', (req, res) => {
    console.log(res.locals)
    res.render("index.ejs")
})

app.use('/users', require('./controllers/users.js'))

//listen on a port
app.listen(PORT, () => {
    console.log(`authenticating user on ${PORT}`)
})