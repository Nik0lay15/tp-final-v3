const getSignUp = (req,res)=>{
    if(req.isAuthenticated()){
        res.redirect("../home");
    }else{
        res.render("auth/signup",{title:"SignUp"});
    }
};

const getLogIn = (req,res)=>{
    if(req.isAuthenticated()){
        res.redirect("../main");
    }else{
        res.render("auth/login",{title:"LogIn"});
    }
};

const getFail = (req,res)=>{
    res.render("auth/fail",{title:"Failure"});
};

const LogOut = (req,res)=>{
    req.session.destroy();
    res.redirect("/auth/login");
};

export default {
    getSignUp,
    getLogIn,
    getFail,
    LogOut
};