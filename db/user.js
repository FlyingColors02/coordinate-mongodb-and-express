let mongoose = require("mongoose");

let userSchema= new mongoose.Schema({
    firstName:{type:String,min:5,max:10,required:true},
    lastName:{type:String,min:5,max:10,required:true},
    Address:{type:String,required:true},
    userLogin:{
        emailId:{type:String,required:true},
        password:{type:String,required:true}
    }
});

let userModel = mongoose.model("userDetails",userSchema);
module.exports=userModel;