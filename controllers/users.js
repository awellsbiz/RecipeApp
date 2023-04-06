//require packages
const express = require('express')
const router = express.Router()

//GET /users/new -- show rout for a form that creats a new user who signs up for app

//POST /user -- Create a new user from the form @ get /users/new

//GET /users/login -- show rout for a form that lets user log in

//POST /users/login -- authenticat a users credentials (breaking rest rules here cause POST is not CREATE-- techincally its a READ )

// GET /users/logout -- log out the current user 

//GET /users/profiles -- show autorize users their profile page 

//export router
module.exports = router