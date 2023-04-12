//Requiree the packages that I need
const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptoJs = require('crypto-js')
//const recipeFaves = require('../models/recipe')

//ROUTES
//POST /recipe/:label -- this route will add a note recipes
router.post('/recipes/:recipeId', async (req,res) => {
    try{
        // const commentBody = await db.comments.comment
        console.log("look at me", commentBody)
        res.send('put a note on me')
    }catch(err){
        console.log(err)
    }
})

//GET /user/:userId/favorite -- READ list of users saved recipes w comments 
router.get('/', async (req,res) => {
    try{
        const user = await db.user.findByPk(res.locals.user.id)
        // console.log("log faves:", userData)
        console.log(res.locals.user)
        console.log(user)
        res.render('users/profile', { userData: res.locals.user})
    }catch(err){
        console.log(err)
    }
})

//PUT /recipe/:label -- UPDATE the comment
router.put('/recipes/:label', async (req,res) => {
    try{
        res.send('Edit my comment')
    }catch(err){
        console.log(err)
    }
})

//Delete /recipe/:label -- DELETE the comment
router.delete('/recipes/:label', async (req,res) => {
    try{
        res.send('put a note on me')
    }catch(err){
        console.log(err)
    }
})




//export router
module.exports = router