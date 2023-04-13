//Requiree the packages that I need
const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptoJs = require('crypto-js')
//const recipeFaves = require('../models/recipe')

//ROUTES
//POST /recipe/:label -- this route will add a note recipes
router.post('/:recipeId', async (req,res) => {
    try{
        //accsessing to work around the error of sequelize not accepting the array
        const comment = req.body.comment[1]
        console.log("Im right here", comment)
       const newComment = await db.comment.create({comment: comment})
       console.log(newComment.recipe)
        res.redirect('/favorites')
    }catch(err){
        console.log(err)
    }
})

//GET /commentId -- load the comment to be edited
router.get('/:commentId', async (req,res) => {
    try{
        const comment = await db.comment.findByPk(req.params.commentId)
        console.log('here', comment)
        res.render('/', { comment: comment })
    }catch(err){
        console.log(err)
    }
})

//PUT /:commentID -- UPDATE the comment
router.put('/:commentId', async (req,res) => {
    try{
        const comment = await db.comment.findByPk(req.params.commentId)
        // edit the comment comment.update({comment: req.body.text})
        res.redirect('/favorites')
    }catch(err){
        console.log(err)
    }
})

//GET /favorite -- READ list of users saved recipes w comments 
router.get('/', async (req,res) => {
    try{
        // const user = await db.user.findByPk(res.locals.user.id)
        // // console.log("log faves:", userData)
        // console.log("JUST SOMETHING", res.locals.user.recipes)
        // console.log("a unique STRING", user.recipes)
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