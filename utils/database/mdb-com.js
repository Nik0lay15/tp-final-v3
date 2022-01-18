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
            await mongoose.connect(process.env.MONGODB,{
                useNewUrlParser:true,
                useUnifiedTopology:true,
                serverSelectionTimeoutMS:1000,
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
            cb(user_search);
        }catch(error){
            console.log(error);
        }
        await mongoose.connection.close();
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
                console.log("User insert successfull");
                const new_user = new models.UserModel({
                    "email":email,
                    "password":pass_hash,
                    "name":name,
                    "address":address,
                    "age":age,
                    "phone_prefix":phone_prefix,
                    "phone":phone,
                    "admin":false,
                });
                await new_user.save((error)=>{
                    if(error) console.log(error);
                });
                cb(new_user);
            }
        }catch(error){
            console.log(error);
        }
        await mongoose.connection.close();
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
        await mongoose.connection.close();
    }
}

export default MongoCommand;