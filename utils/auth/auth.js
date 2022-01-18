import passport from "passport";
import { Strategy as LocalStrategy}  from "passport-local";
import MongoCom from "../database/mdb-com.js";

const db = new MongoCom();

const signup = passport.use("signup",new LocalStrategy({usernameField:"email",passReqToCallback:true},(req,email,password,done)=>{
    console.log("Signin up");
    const {name,address,age,phone_prefix,phone} = req.body;
    db.InsertUser(email,password,name,address,age,phone_prefix,phone,(e)=>{
        done(null,e);
    });
}));

const login = passport.use("login",new LocalStrategy({usernameField:"email"},(email,password,done)=>{
    db.CheckPassword(email,password,(e)=>{
        done(null,e);
    });
}));

passport.serializeUser((user,done)=>{
    return done(null,user.email);
});

passport.deserializeUser((id,done)=>{
    db.FindId(id,(e)=>{
        return done(null,e);
    });
});

export default {login, signup};