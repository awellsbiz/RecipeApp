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
        //can use this to associate user aswell 
        const recipe = await db.recipe.findByPk(req.params.recipeId)
        console.log("SEE ME!!", req.params)
        const comment = req.body.comment
        console.log("Im right here", comment)
       const newComment = await db.comment.create({comment: comment, })
       recipe.addComment(newComment)
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
        const recipeLookUp = await db.recipe.findAll({
            include: [db.comment]
        })
        res.render('users/profile', { recipes: recipeLookUp})
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
router.delete('/favorites/:label', async (req,res) => {
    try{
        const deleteRecipe = await db.recipe.destroy({
            where: {
                id: db.recipeId
            }
        })
        console.log(deleteRecipe)
        res.redirect('/')
    }catch(err){
        console.log(err)
    }
})




//export router
module.exports = router