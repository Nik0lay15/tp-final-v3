import db from "../database/mdb-com.js";

const GetHome = async(req,res)=>{
    try{
        const {name,admin} = req.user;
        await db.ReadProducts((products)=>{
            console.log(products);
            res.render("common/home.hbs",{title:"Home",name,admin,products});
        });
    }catch(error){
        console.log(error);
    }
};

const GetProfile = async(req,res)=>{
    try{
        if(req.isAuthenticated()){
            const {email,password,name,address,age,prefix_phone,phone,avatar,admin} = req.user;
            await res.render("common/profile.hbs",{title:"Profile",email,password,name,address,age,prefix_phone,phone,avatar,admin});
        }else{
            res.redirect("../auth/login");
        }
    }catch(error){

    }
};

const PostAvatar = async(req,res)=>{
    try{
        const filename = req.file.filename;
        const email = req.user.email;
        await db.ChangeAvatar(filename,email);
        res.redirect("/profile");
    }catch(error){
        console.log(error)
    }
};

export default {
    GetHome,
    GetProfile,
    PostAvatar,
};