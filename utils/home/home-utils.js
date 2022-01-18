const GetHome = (req,res)=>{
    const name = req.user.name;
    res.render("common/home.hbs",{title:"Home",name});
};

const GetProfile = (req,res)=>{
    if(req.isAuthenticated()){
        const {email,password,name,address,age,prefix_phone,phone,avatar} = req.user;
        res.render("common/profile.hbs",{title:"Profile",email,password,name,address,age,prefix_phone,phone});
    }else{
        res.redirect("../auth/login");
    }
};

export default {
    GetHome,
    GetProfile
};