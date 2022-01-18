import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    address:{type:String,required:true},
    age:{type:String,required:true},
    phone_prefix:{type:String,required:true},
    phone:{type:String,required:true},
    admin:{type:Boolean,required:true},
    avatar:{type:String,default:"default.png"}
});

const UserModel = mongoose.model("users",UserSchema);

export default {
    UserModel
};