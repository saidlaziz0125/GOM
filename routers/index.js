const express = require("express")
const router = express.Router()
const productDb = require("../model/product")


router.get("/", (req, res)=>{
    productDb.find({}, (err, data)=>{
        res.render("index", {
            title: "Home",
            home: true,
            data: data
        })
    })
})




module.exports = router