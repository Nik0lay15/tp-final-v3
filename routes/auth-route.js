import {Router} from "express";
import passport from "passport";
import strategys from "../utils/auth/auth.js";
import AuthUtils from "../utils/auth-utils/auth-utils.js";

const router = Router();

router.get("/signup",AuthUtils.getSignUp);
router.get("/login",AuthUtils.getLogIn);
router.get("/error",AuthUtils.getFail);
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/auth/login");
});

router.post("/signup",passport.authenticate("signup",{failureRedirect:"/error",successRedirect:"../home"}));
router.post("/login",passport.authenticate("login",{failureRedirect:"/error",successRedirect:"../home"}));


export default router;