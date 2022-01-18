import {Router} from "express";
const router = Router();

router.get("/home",(req,res)=>{
    const {email,password,name,address,age,prefix_phone,phone,avatar} = req.user;
    res.render("common/home.hbs",{title:"Main page",email,password,name,address,age,prefix_phone,phone});
});

export default router;