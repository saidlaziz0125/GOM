const express = require("express")
const router = express.Router()
const userDb = require("../model/user")
const ProductDb = require("../model/product")
const mongoose = require("mongoose")
const path = require("path")
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


router.get("/add/:id", (req, res)=>{
    res.render("add", {
        title: "Add Product",
        add: true,
        userId: req.params.id
    })
})
router.post('/add/:id',uploads, (req, res)=>{
    const {product_name, category, region, district, price, discount, img, phone, phone_code, comment, director_id, date}= req.body;
    const db = new ProductDb({
        product_name: product_name,
        category: category,
        region: region,
        district: district,
        price: price,
        discount: discount,
        photo: req.file.path,
        phone: phone,
        comment: comment,
        director_id: req.params.id,
        phone_code: phone_code,
        date: date
    })
    db.save()
    res.redirect('/add/'+req.params.id)
})

module.exports = router
