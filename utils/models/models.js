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

const ProductSchema = mongoose.Schema({
    id:{type:String,required:true},
    timestamp:{type:Number,required:true},
    name:{type:String,required:true},
    description:{type:String,required:true},
    code:{type:String,required:true},
    img:{type:String,required:true},
    price:{type:Number,required:true},
    stock:{type:Number,required:true}
});

const UserModel = mongoose.model("users",UserSchema);
const ProductModel = mongoose.model("products",ProductSchema);


export default {
    UserModel,
    ProductModel
};