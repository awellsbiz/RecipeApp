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
        const comment = req.body.comment
       const newComment = await db.comment.create({comment: comment, })
       recipe.addComment(newComment)
        res.redirect('/favorites')
    }catch(err){
        console.log(err)
    }
})

//GET /commentId -- load the comment to be edited
router.get('/:commentId', async (req,res) => {
    try{
        const comment = await db.comment.findByPk(req.params.commentId)
        res.render('/', { comment: comment })
    }catch(err){
        console.log(err)
    }
})

//PUT /:commentID -- UPDATE the comment
router.put('/:commentId', async (req,res) => {
    try{
        const comment = await db.comment.findByPk(req.params.commentId)
        const update = await comment.update({comment: req.body.comment})
        // edit the comment comment.update({comment: req.body.text})
        console.log('HERE!!!!!!', update)
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
router.put('/:recipeId', async (req,res) => {
    try{
        res.send('Edit my comment')
    }catch(err){
        console.log(err)
    }
})

//Delete /recipe/:label -- DELETE the comment
router.delete('/:recipeId', async (req,res) => {
    try{
        const recipeId = Number(req.params.recipeId)
        const deleteRecipe = await db.recipe.destroy({
            where: {
                id: recipeId
            }
        })
        
        console.log("watch this CONSOLE!!!!:")
        res.redirect('/favorites')
    }catch(err){
        console.log(err)
    }
})




//export router
module.exports = router