const express = require("express")
const router = express.Router()
const userDb = require("../model/user")
const ProductDb = require("../model/product")
const bcryptjs = require("bcryptjs")
const mongoose = require("mongoose")
const path = require("path")
const saved = require("../model/saved")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, res, cb)=>{
        cb(null, "uploads")
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now().toString()+ path.extname(file.originalname))
    }
})

const uploads = multer({
    storage,
    limits: {fieldSize: 3*1024*1024},
    fileFilter: (req, file, cb)=>{
        const extname = path.extname(file.originalname)
        if(extname!==".jpg" && extname!==".jpeg" && extname!==".png" && extname!==".jfif" && extname!==".webp") {
            const err = new Error("error")
            err.code=404
            return cb(err)
        }
        cb(null, true)
    } ,
    preservePath: true
}).single("photo")


router.get("/signup", (req, res) => {
    res.render("register", {
        title: "Sign Up",
        active: true,
        activeSignUp: true
    })
})


router.post("/signup", (req, res) => {


        const { username, lastname, email, login, password, password2, date } = req.body
        bcryptjs.hash(password, 10, (err, hash) => {
            const db = new userDb({
                username: username,
                lastname: lastname,
                email: email,
                login: login,
                password: hash,
                date: date
            })

            db.save()
            res.redirect("/user/"+db.id)
        })
    

})


router.get("/signin", (req, res) => {
    res.render("register", {
        title: "Sign In",
        activeSignIn: true
    })
})


router.post("/signin", uploads, (req, res) => {
    const {login, password}=req.body
    userDb.findOne({login: login}, (err, data)=>{
        if(!data) {
            res.render("register", {
                title: "Kirishda Xatolik",
                error: "Login yoki Parolda XAtolik bor!"
            }) 
        }else {
            bcryptjs.compare(password, data.password, (err, data1)=>{
                if(!data1) {
                    res.render("register", {
                        title: "Kirishda Xatolik",
                        error: "Login yoki Parolda XAtolik bor!"
                    })
                }else {
                    ProductDb.find({}, (err, productData)=>{
                        saved.find({}, (err, savedData)=>{
                            res.render("profile", {
                                title: "Profil",
                                data: data,
                                productData: productData,
                                saved: savedData
                            })
                        })
                        
                        router.get("/cardsIn/:id", (req, res)=>{
                            ProductDb.findById(req.params.id, (err, cardData)=>{
                                if(cardData.director_id == data.id){ 
                                    res.render("cards", {
                                        title: cardData.product_name,
                                        cardData: cardData,
                                        own: true
                                    })
                                }else {
                                    res.render("cards", {
                                        title: cardData.product_name,
                                        cardData: cardData
                                    })
                                }
                                
                            })
                        })

                    })
                    
                }
            })
        }
        
    })
})  

module.exports = router