import {Router} from "express";
import multer from "multer";
import ProductsUtils from "../utils/products/products-utils.js";

const router = Router();
const upload = multer({
    dest:"./public"
});

router.get("/add",ProductsUtils.GetAddProducts);
router.get("/delete",ProductsUtils.GetDeleteProduct);

router.post("/add",upload.single("product-img"),ProductsUtils.PostAddProduct);
router.post("/delete/:code",ProductsUtils.DeleteProduct);

export default router;