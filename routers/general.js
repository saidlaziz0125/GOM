const express = require("express")
const router = express.Router()
const product = require("../model/product")
const saved = require("../model/saved")



router.get("/general/:id",(req, res)=>{
    product.find({}, (err, data)=>{
        res.render("general",{
            title: "General",
            data: data,
            userId: req.params.id

        })
    })
})

router.get("/saved/:id/user/:userId", (req, res)=>{
    product.findById(req.params.id, (err, data)=>{
        const {product_name, category, region, district, price, discount, photo, phone, phone_code, comment, director_id, date}= data;

        const db = new saved({
            product_name: product_name,
            category: category,
            region: region,
            district: district,
            price: price,
            discount: discount,
            photo: photo,
            phone: phone,
            comment: comment,
            director_id: director_id,
            phone_code: phone_code,
            date: date,
            liker_id: req.params.userId 
        })
        db.save()
        res.redirect('/general/'+req.params.userId)
    })
})







module.exports = router