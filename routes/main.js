import {Router} from "express";
import HomeUtils from "../utils/home/home-utils.js";

const router = Router();

router.get("/home",HomeUtils.GetHome);
router.get("/profile",HomeUtils.GetProfile);

export default router;