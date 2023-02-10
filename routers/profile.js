const express = require('express')
const product = require('../model/product')
const user = require('../model/user')
const router = express.Router()
// NOTE

router.get("/user/:id", (req, res)=>{
    user.findById(req.params.id, (err, data)=>{
        product.find({} , (err, productData)=>{
            res.render("profile", {
                title: "User",
                data: data,
                productData: productData
            })
        })
    })
})

module.exports = router