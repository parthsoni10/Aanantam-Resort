const { boolean } = require("joi");
const mongoose=require("mongoose");
const passport_local_mongoose=require("passport-local-mongoose");

main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const signupschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,},
    phone:{
        type:Number,
        required:true,},
    address:{
        type:String,
        required:true,},
    state:{
        type:String,
        required:true,},
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"booking",
    }
});

signupschema.plugin(passport_local_mongoose);

module.exports=mongoose.model("signup",signupschema);

