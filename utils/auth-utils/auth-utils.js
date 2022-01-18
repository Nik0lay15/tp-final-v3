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

export default {
    getSignUp,
    getLogIn,
    getFail
};