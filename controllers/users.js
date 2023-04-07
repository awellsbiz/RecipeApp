//require packages
const express = require('express')
const router = express.Router()

//GET /users/new -- show rout for a form that creats a new user who signs up for app
router.get('/new', (req,res) => {
    res.render('users/new.ejs')
})


//POST /user -- Create a new user from the form @ get /users/new

router.post('/', (req,res) => {
    //do a find or create with the users given email
        //if the user's returns as found -- dont let them sign up
        // instead redirect them to the loging page
    //hash the users password before we add it in the database
    //save the user in the password
    //encrypt the logged in user id set encrypted id as a cookie
    //redirect user

    res.send('create a new user if they dont exist in the db')
})

//GET /users/login -- show rout for a form that lets user log in

router.get('/login', (req,res) => {
    res.send('show a for to let user to log in ')
})

//POST /users/login -- authenticat a users credentials (breaking rest rules here cause POST is not CREATE-- techincally its a READ  )
router.post('/login', (req,res) => {
    res.send('verify credentials that are given by the user to log in')
})

// GET /users/logout -- log out the current user 
router.get('/logout', (req,res) => {
    res.send('log user out')
})

//GET /users/profiles -- show autorize users their profile page 
router.get('/profile', (req,res) => {
    res.send('show the curently user log in')
})

//export router
module.exports = router