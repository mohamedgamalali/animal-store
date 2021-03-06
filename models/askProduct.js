const mongoose = require('mongoose');

const schema   = mongoose.Schema;

const askProductSchema = new schema({
    user:{
        type:schema.Types.ObjectId,
        ref:'user'
    },
    approve:{
        type:String,
        default:'binding'
    },
    desc:String,
    helth:String,
    amount:String,
    color:String,
    adress:String,
    age:String,
    production:String,
    size:String,
    sex:String,
    city:String,
    Bids:[{
        imageUrl:[{
            type:String,
            required:true
        }],
        vidUrl:{
            type:String
        }, 
        helth:String,
        amount:String,
        price:Number,
        color:String,
        age:String,
        desc:String,
        city:String,
        sex:String,
        size:String,
        production:String,
        adress:{
            type:String,
            require:true
        },
        user:{
            type:schema.Types.ObjectId,
            ref:'user'
        },
        selected:{
            type:Boolean,
            default:false
        }
    }],
    catigory:{
        type:schema.Types.ObjectId,
        ref:'catigory'
    },
    ended:{
        type:Boolean,
        default:false
    },
    pay:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports = mongoose.model('askForProduct',askProductSchema);