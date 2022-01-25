const Authenthicate = (req)=>{
    return req.isAuthenticated() && req.user.admin ? true : false;
};

export default Authenthicate;