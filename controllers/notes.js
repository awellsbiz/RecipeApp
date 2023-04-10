//Requiree the packages that I need
const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptoJs = require('crypto-js')

//ROUTES
//POST /recipe/:label -- this route will add a note recipes
router.post('/recipes/:label', async (req,res) => {
    try{
        res.send('put a note on me')
    }catch(err){
        console.log(err)
    }
})

//GET /user/:userId/favorite -- READ list of users saved recipes w comments 
router.get('/user/:userId', async (req,res) => {
    try{
        res.send('Showing full saved list of recipes')
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