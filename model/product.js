const mongoose = require("mongoose")
const schema = mongoose.Schema


const db = new schema({
    product_name: {
        required: true,
        type: String
    },
    category: {
        required: true,
        type: String
    },
    region: {
        required: true,
        type: String
    },
    district: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    discount: {
        type: Number,
        required: true
    },
    photo: {
        type: String
    },
    phone_code: {
        required: true,
        type: String
    },
    comment: {
        required: true,
        type: String
    },
    director_id: schema.Types.ObjectId,
    phone: {
        type : String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("product", db)