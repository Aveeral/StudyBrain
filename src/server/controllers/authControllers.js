const authServices = require("../services/authServices.js");

async function register(req,res,next){
    try{
        const email = req.body.email;
        const display_name = req.body.display_name;
        const password = req.body.password;
        const token = await authServices.register(display_name,email,password);
        return res.status(201).json(token);
    }catch(err){
        next(err);
    }
}

async function login(req,res,next){
    try{
        const email = req.body.email;
        const password = req.body.password;
        const token = await authServices.login(email,password);
        return res.status(200).json(token);
    }catch(err){
        next(err);
    }
}

module.exports = {register,login};