import {Router} from "express";
import ErrorUtils from "../utils/error/error-utils.js";

const router = Router();

router.get("/",ErrorUtils.GetError);

export default router;