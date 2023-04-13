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
        const comment = req.body.comment
       const newComment = await db.comment.create({comment: comment, recipeId: req.params.recipeId})
       console.log(newComment.recipe)
        res.redirect('/favorites')
    }catch(err){
        console.log(err)
    }
})

//GET /commentId -- load the comment to be edited
router.get('/:commentId', async (req,res) => {
    try{
        const comment = await db.comment.findByPk(res.params.commentId)
        res.render('comments/edit', { comment: comment })
    }catch(err){
        console.log(err)
    }
})

//PUT /:commentID -- UPDATE the comment
router.put('/:commentId', async (req,res) => {
    try{
        const comment = await db.comment.findByPk(res.params.commentId)
        // edit the comment comment.update({comment: req.body.text})
        res.redirect('/favorites')
    }catch(err){
        console.log(err)
    }
})

//GET /favorite -- READ list of users saved recipes w comments 
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