import {Router} from "express";
const router = Router();

router.get("/",(req,res)=>{
    res.render("error/fail",{route:req.baseUrl});
});

export default router;