const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const bankSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true,
       
    },
    transitionNo: {
        type: String,
        trim:true,
        required: true,
       
       
    },
    transitionType:{
        type:String,
        trim: true,
        required:true,
    },

    
    amount:{
      type:String,
    required:true,
    trim: true,

    },
    title: {
        type: String,
        trim: true,
        required: true,
        enum: ['Mr', 'Mrs', 'Miss']
    },
    name: {
        type: String,
        trim: true,
        required:true,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required:true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required:true,
        
    },
    address: {
        street: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        pincode: {
            type: String,
            trim: true,
        }
    },
    releasedAt: {
        type: Date,
        required: true,
    },
    
    
   
    isDeleted: {
        type: Boolean,
        default: false
    }

})
module.exports=mongoose.model('user2',bankSchema)