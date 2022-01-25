import auth from "../verficiation.js";
import db from "../database/mdb-com.js";
import uniqid from "uniqid";

const GetAddProducts = (req,res)=>{
    const {name,admin} = req.user;
    if(auth(req)){
        res.render("products/products-form",{title:"Add product",admin,name});
    }else{
        res.redirect("../home");
    }
};

const GetDeleteProduct = async(req,res)=>{
    const {name,admin} = req.user;
    try{
        if(auth(req)){
            await db.ReadProducts((products)=>{
                res.render("products/delete",{title:"Delete product",name,admin,products})
            });
        }else{
            res.redirect("../home");
        }
    }catch(error){
        console.log(error);
    }
};

const DeleteProduct = async(req,res)=>{
    if(auth(req)){
        try{
            const {code} = req.params;
            await db.DeleteProduct(code);
            res.redirect("/products/delete");
        }catch(error){
            console.log(error);
        }
    }else{
        res.redirect("../home");
    }
};

const PostAddProduct = async(req,res)=>{
    try{
        if(auth(req)){
            const {name,description,price,stock} = req.body;
            const product = {
                id:uniqid.time(),
                timestamp:Date.now(),
                name,
                description,
                code:uniqid(),
                img:req.file.filename,
                price,
                stock
            }
            await db.AddProduct(product);
            res.redirect("../home");
        }else{
            res.redirect("../home");
        }
    }catch(error){
        console.log(error);
    }
};


export default {
    GetAddProducts,
    PostAddProduct,
    GetDeleteProduct,
    DeleteProduct
};