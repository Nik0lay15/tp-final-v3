import passport from "passport";
import { Strategy as LocalStrategy}  from "passport-local";
import db from "../database/mdb-com.js";

const signup = passport.use("signup",new LocalStrategy({usernameField:"email",passReqToCallback:true},async(req,email,password,done)=>{
    try{
        const {name,address,age,phone_prefix,phone} = req.body;
        await db.InsertUser(email,password,name,address,age,phone_prefix,phone,(e)=>{
            done(null,e);
        });
    }catch(error){
        console.log(error);
    }
}));

const login = passport.use("login",new LocalStrategy({usernameField:"email"},async(email,password,done)=>{
    try{
        await db.CheckPassword(email,password,(e)=>{
            done(null,e);
        });
    }catch(error){
        console.log(error);
    }
}));

passport.serializeUser((user,done)=>{
    return done(null,user.email);
});

passport.deserializeUser(async (id,done)=>{
    try{
        await db.FindId(id,(e)=>{
            return done(null,e);
        });
    }catch(error){
        console.log(error);
    }
});

export default {login, signup};