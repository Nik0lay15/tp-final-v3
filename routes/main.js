import {Router} from "express";
import HomeUtils from "../utils/home/home-utils.js";
import multer from "multer";

const router = Router();
const upload = multer({
    dest:"./public",
});

router.get("/home",HomeUtils.GetHome);
router.get("/profile",HomeUtils.GetProfile);

router.post("/profile/avatar",upload.single("avatar-form"),HomeUtils.PostAvatar);

export default router;