//require packages
const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptoJs = require('crypto-js')

//GET /users/new -- show rout for a form that creats a new user who signs up for app
router.get('/new', (req,res) => {
    res.render('users/new.ejs')
})



//POST /user -- Create a new user from the form @ get /users/new

router.post('/', async (req,res) => {
    //do a find or create with the users given email
    try {
        //console.log(req.body)
        const [newUser, created] = await db.user.findOrCreate({
                where: {
                        name: req.body.name,
                        email: req.body.email
                    }
                })
                if (!created) {
                    
                    //if the user's returns as found -- dont let them sign up
                    //console.log('user account exist')
                    // instead redirect them to the login page
                    res.redirect('/users/login?message=Please login to your account to continue 🙈')
                    }else{
                        
                            //hash the users password before we add it in the database
                            const hashedPassed = bcrypt.hashSync(req.body.password, 12)
                            //save the user in the password
                            newUser.password = hashedPassed
                            await newUser.save()
                            //encrypt the logged in user id 
                            const encryptedPk = cryptoJs.AES.encrypt(newUser.id.toString(), process.env.ENC_KEY)
                            //set encrypted id as a cookie
                            res.cookie('userId', encryptedPk.toString())
                            //redirect user
                            res.redirect('./profile')
                        
                        }
                    }catch(err) {
                        console.log(err)
                        res.redirect('/')
                        //res.render('users/profile.ejs')
    }                  
})

//GET /users/login -- show rout for a form that lets user log in

router.get('/login', (req,res) => {
    //console.log(req.query)
    res.render('users/login.ejs', {
        message: req.query.message ? req.query.message : null
    })
})

//POST /users/login -- authenticat a users credentials (breaking rest rules here cause POST is not CREATE-- techincally its a READ  )
router.post('/login', async (req,res) => {
    try{
        //console.log(req.body)
        //search for the users email in the DB
        const foundUser = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        const failedLoginMessage = "incorrect email or password 🧐"
            //if the users email is not found -- do not let them log in
            if (!foundUser) {
                //console.log('user not found')
                res.redirect('/users/login?message=' + failedLoginMessage)
            }else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
                //console.log("incorrect PW")
                //if the user exist but they have the wrong password-- do not let them log in
                
                res.redirect('/users/login?message=' + failedLoginMessage)
                
            }else {
                //if the user exist, they know the right password-- log them in
                const encryptedPk = cryptoJs.AES.encrypt(foundUser.id.toString(), process.env.ENC_KEY)
                //set encrypted id as a cookie
                res.cookie('userId', encryptedPk.toString())
                //redirect user
                res.redirect('/favorites')
                //set the encrypted PK as a cookie
                //redirect them to their profile
            }

    }catch(err){
        console.log(err)
        res.redirect('/')
    }
    //res.send('verify credentials that are given by the user to log in')
})

// GET /users/logout -- log out the current user 
router.get('/logout', (req,res) => {
  console.log('loggong user out!')
  res.clearCookie('userId')
  res.redirect('/')
})

//GET /users/profiles -- show autorize users their profile page 
router.get('/profile', async (req,res) => {
    try {
       
        //if the user comes and is not logged -- they lack authorization
        if(!res.locals.user) {
            //redirect the to login
            res.redirect('/users/login?message"You are not authorized to view that page. Please authenticate to continue')
        }else{
            //if ther are allowed to be here show them their profile
            res.render('users/profile.ejs')
            
        }

    }catch(err){
        console.log(err)
    }
    })


//export router
module.exports = router