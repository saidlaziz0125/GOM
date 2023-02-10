const express = require("express")
const router = express.Router()
const ProductDb = require("../model/product")
const user = require("../model/user")


router.get("/del/:id", (req, res)=>{
    ProductDb.findByIdAndDelete(req.params.id, (err, data)=>{
        res.redirect("/general/"+data.director_id)
    })
})

router.get("/search:id", (req, res)=>{
    let {search} = req.query
    ProductDb.find({product_name : {$regex: search}}, (err, productData)=> {
        if(productData=="") {
            res.render('general', {
                title: "Searched products",
                msg: "Qidirlgan mahsulot hali mavjud emas",
                userId: req.params.id
            })
        }
        else{ 
            res.render('general', {
                title: "Searched products",
                productData: productData,
                msg: "qidirish bo'iycha natijalar",
                userId: req.params.id
            })
        }
        
    })
})


module.exports = router