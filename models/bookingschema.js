const { boolean } = require("joi");
const mongoose=require("mongoose");
const signupschema = require("./signupschema");     

main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const bookingschema=new mongoose.Schema({
    title:String,
    type:String,
    price:Number,
    state:Boolean,
    room_no:Number,
    booked_dates: [ 
        {
            
            checkin: Date,
            checkout: Date,
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"signup"
    },
});

const booking=mongoose.model("booking",bookingschema);
module.exports=booking;