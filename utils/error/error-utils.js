const GetError = (req,res)=>{
    res.render("error/fail",{route:req.baseUrl});
};

export default {
    GetError,
};