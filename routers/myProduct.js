const express = require("express")
const router = express.Router()
const ProductDb = require("../model/product")
const userDb = require("../model/user")
const mongoose = require("mongoose")
const path = require("path")


router.get("/myProduct/:director_id",(req, res)=>{
   
    const promise = userDb.aggregate([
        {
            $match:{
                _id: mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup:{
                from: "products",
                localField: "_id",
                foreignField: "director_id",
                as: "gadgets"
            }
        },
        {
            $unwind: {
                path: "$gadgets"
            }
        }
    ])
    promise.then(myproductdata=>{
        res.render("myproduct", {
            title: "My products",
            myproductdata: myproductdata,
            userId: req.params.director_id
        })
    })

   
})



module.exports = router