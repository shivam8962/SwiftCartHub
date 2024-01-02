const mongoose = require("mongoose")
const { Schema } = mongoose; 

const productSchema = new Schema({
    name:{
        type: String,
        required:[true, "Please enter product name"],
        trim:true
    },

    description:{
        type : String,
        required:[true, "Please enter product description"]
    },

    price:{
        type:Number,
        required:[true, "Please Enter product price"],
        maxLength:[8,"Price cannot exceed 8 characters"]
    },

    ratings:{
        type: Number,
        default:0
    },

    images:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],

    category:{
        type:String,
        required:[true, "Please enter product category"],
    },

    Stock:{
        type:Number,
        required:[true, "Please enter product stock"],
        maxLength:[4, "Stock cannot exceed more"],
        default: 1
    },

    numOfReviews:{
        type:Number,
        default:0
    },

    reviews:[{
        user:{
            type: Schema.ObjectId,
            ref: "User",
            required: true
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }],

    user:{
        type: Schema.ObjectId,
        ref: "User",
        required: true
    },

    createAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Product", productSchema);