//Requiree the packages that I need
const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptoJs = require('crypto-js')

//ROUTES
//POST /:label -- this route will add a comment to recipes
router.post('/:recipeId', async (req,res) => {
    try{
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

//GET /favorite -- READ list of users saved recipes + comments 
router.get('/', async (req,res) => {
    try{
        const recipeLookUp = await db.recipe.findAll({
            include: [db.comment]
        })
        res.render('users/profile', { recipes: recipeLookUp})
        
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