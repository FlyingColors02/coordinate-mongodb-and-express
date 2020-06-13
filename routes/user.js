let express =require("express");
let model = require("../db/user");
let router = express.Router();
let joi=require("@hapi/joi");

//fetch the data
router.get("/allusers",async(req,res)=>{
let user= await model.find();
res.send({data:user});
});

//find the data by id
router.get("/user/:id",async (req,res)=>{
    let user= await model.findById(req.params.id);
    if(!user){return res.status(404).send({message:"invalid user id"})};
    res.send({data:user});
})

router.post("/user/newuser",async(req,res)=>{
    let {error}= ValidationError(req.body);
    if(error){return res.send(error.details[0].message)};
    let newData = new model({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        Address:req.body.Address,
        userLogin:req.body.userLogin
    });
    let data= await newData.save();
    res.send({message:"thank you",d:data});
});
function ValidationError(error){
    let Schema = joi.object({
        firstName:joi.string().min(4).max(10).required(),
        lastName:joi.string().min(4).max(10).required(),
        Address:joi.string().min(5).required(),
        userLogin:{
            emailId:joi.string().email().required(),
            password:joi.string().required()
        }
    });
    return Schema.validate(error);
}

router.put("user/updateuser/:id",async(req,res)=>{
    let user = await model.findById(req.params.id);
    if(!user){return res.status(404).send({message: "invalid id"})}
    let {error}= ValidationError(req.body);
    if(error){return res.send(error.details[0].message)}
    user.firstName=req.body.firstName;
    user.lastName=req.body.lastName;
    await user.save();
    res.send({message:"user data got updated"})
})

router.delete("user/removeuser/:id",async(req,res)=>{
    let user= await model.findByIdAndRemove(req.params.id);
    if(!user){return res.status(404).send({message:"invalid id"})}
    res.send({message:"user is removed"});
})
module.exports = router;
