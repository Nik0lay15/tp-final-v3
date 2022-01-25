import mongoose from "mongoose";
import dotenv from "dotenv";
import dat from "date-and-time";
import models from "../models/models.js";
import bcrypt from "bcrypt";

dotenv.config({
    path:"./config/.env"
});

class MongoCommand {

    async Connection(){
        try{
            mongoose.connect(process.env.MONGODB, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 1000,
                maxPoolSize: 5,
            });
            console.log(`Connection to base ${dat.format(new Date(),"DD/MMMM/YYYY")}`);
        }catch(error){
            console.log(error);
        }
    }

    async ReadUser(email,cb){
        try{
            await this.Connection();
            const user_search = await models.UserModel.findOne({email:email});
            await mongoose.connection.close();
            cb(user_search);
        }catch(error){
            console.log(error);
        }
    }

    async FindId(id,cb){
        try{
            await this.Connection();
            const user_search = await models.UserModel.findOne({email:id});
            await cb(user_search);
        }catch(error){
            console.log(error);
        }
    }

    async InsertUser(email,password,name,address,age,phone_prefix,phone,cb){
        try{
            await this.Connection();
            const search_user = await models.UserModel.findOne({email:email});
            if(search_user != null){
                cb(false,console.log("Email already exists"));
            }else{
                const pass_hash = await bcrypt.hash(password,10);
                await models.UserModel.insertMany({
                    email:email,
                    password:pass_hash,
                    name:name,
                    address:address,
                    age:age,
                    phone_prefix:phone_prefix,
                    phone:phone,
                    admin:false,
                });
                const new_user = await new models.UserModel({
                    "email":email,
                    "password":pass_hash,
                    "name":name,
                    "address":address,
                    "age":age,
                    "phone_prefix":phone_prefix,
                    "phone":phone,
                    "admin":false,
                });
                new_user.save((error)=>{
                    if(error) console.log(error);
                });
                cb(new_user);
            }
        }catch(error){
            console.log(error);
        }
    }
    
    async CheckPassword(email,password,cb){
        try{
            await this.Connection();
            const user_search = await models.UserModel.findOne({email:email});
            console.log(user_search);
            if(user_search == null){
                cb(false,console.log("Email incorrect"));
            }else{
                const valid_pass = await bcrypt.compare(password,user_search.password);
                if(valid_pass){
                    cb(user_search);
                }else{
                    cb(false,console.log("Password incorrect"));
                }
            }
        }catch(error){
            console.log(error);
        }
    }

    async ChangeAvatar(filename,email){
        try{
            await this.Connection();
            await models.UserModel.updateOne({email:email},{$set:{avatar:filename}})
        }catch(error){
            console.log(error);
        }
    }   

    async ReadProducts(cb){
        try{
            await this.Connection();
            const product_list = await models.ProductModel.find({}).lean();
            cb(product_list);
        }catch(error){
            console.log(error)
        }
    }

    async AddProduct(payload){
        try{
            await this.Connection();
            const {id,timestamp,name,description,code,img,price,stock} = payload;
            await models.ProductModel.insertMany({
                id:id,
                timestamp:timestamp,
                name:name,
                description:description,
                code:code,
                img:img,
                price:price,
                stock:stock
            });
        }catch(error){  
            console.log(error);
        }
    }

    async DeleteProduct(code){
        console.log(mongoose.connections.length);
        try{
            await this.Connection();
            await models.ProductModel.deleteOne({code:code});
        }catch(error){
            console.log(error);
        }
    }
}

const db = new MongoCommand();

export default db;