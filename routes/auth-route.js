import {Router} from "express";
import passport from "passport";
import strategys from "../utils/auth/auth.js";
import AuthUtils from "../utils/auth/auth-utils.js";

const router = Router();

router.get("/signup",AuthUtils.getSignUp);
router.get("/login",AuthUtils.getLogIn);
router.get("/error",AuthUtils.getFail);
router.get("/logout",AuthUtils.LogOut);

router.post("/signup",passport.authenticate("signup",{failureRedirect:"/error",successRedirect:"../home"}));
router.post("/login",passport.authenticate("login",{failureRedirect:"/error",successRedirect:"../home"}));


export default router;