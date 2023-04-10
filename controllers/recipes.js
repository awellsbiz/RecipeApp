//Requiree the packages that I need
const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptoJs = require('crypto-js')

//Routes

//GET /recipes -- Search bar to search for recipes
router.get('/', async (req,res) => {
    try{
        res.send('this is for Recipe Ingredient search')
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
        res.send('POST saved recipe in this route')
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