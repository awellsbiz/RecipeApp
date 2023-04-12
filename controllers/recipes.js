//Requiree the packages that I need
const express = require('express')
const router = express.Router()
const axios = require('axios')
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptoJs = require('crypto-js')
require('dotenv').config()

//middleware


//Routes

//GET /recipes -- Search bar to search for recipes
router.get('/', async (req,res) => {
    try{
        //console.log('req.query', req.query)
        const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${req.query.search}&app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}`
        
        const response = await axios.get(url)
        //console.log(response.data)
        const recipeData = response.data.hits
        res.render("users/search", {recipes: recipeData})
        
        
    }catch(error){
        console.log(error)
    }
})

//GET /recipes -- Display a list of searched items
router.get('/results', async (req,res) => {
    try{
        res.send('A list of ingredient results')
    }catch(error){
        console.log(error)
    }
})

//POST /:label -- save recipe ingredient to the recipes db
router.post('/:label', async (req,res) => {
    try{
        console.log("req.body:", req.body.url)
        //console.log('req.body.ingredientLines:', recipe.recipe.ingredients)
        const favRecipes = await db.recipe.create({
            label: req.params.label,
            url: req.body.url
        })
        res.send(favRecipes)
    }catch(error){
        console.log(error)
    }
})

//DELETE /:label -- Delete the recipe out of the db
router.delete('/:label', async (req,res) => {
    try{
        res.send('Delete it')
    }catch(error){
        console.log(error)
    }
})

//export router
module.exports = router