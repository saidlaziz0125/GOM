const express = require("express")
const app = express()
const path = require("path")
const port = 2000 || process.env.PORT
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
// const expressValidator = require("express-validator")
// const session = require("express-session")
const rIndex = require("./routers/index")
const rRegister = require("./routers/register")
const rAdd = require("./routers/add")
const rGeneral = require("./routers/general")
const rMyProduct = require("./routers/myProduct")
const rUpdate = require("./routers/update")
const rProfile = require("./routers/profile")

mongoose.connect("mongodb://localhost:27017/OnlineShop2")
const db = mongoose.connection
db.on("open", () => {
    console.log("mongodb running");
})
db.on("error", (err) => {
    console.log("mongodb is wrong");
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set("view engine", "pug")

app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "uploads")))
app.use(express.static(path.join(__dirname)))

app.use(rIndex)
app.use(rRegister)
app.use(rAdd)
app.use(rGeneral)
app.use(rMyProduct)
app.use(rUpdate)
app.use(rProfile)
app.listen(port, () => {
    console.log("server running");
})