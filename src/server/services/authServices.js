const db = require("../db/usersDB.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(display_name,email,password){

   const verifyPassword = password.trim();
   if(!verifyPassword){
    const err = new Error("Please enter Password!");
    err.status = 400;
    throw err;
   }


   const isExistingUser = await db.getUserByEmail(email);
   if(isExistingUser){
    const err = new Error("email already exists!");
    err.status = 409;
    throw err;
   }


   const password_hash = await bcrypt.hash(password,10);
   const user = await db.createUser(email,password_hash,display_name);
   const token = jwt.sign(
    {userId: user.id,email: user.email},
    process.env.JWT_SECRET,
    {expiresIn: "7d"}
   )
   return token;

}

async function login(email,password){

   const isExistingUser = await db.getUserByEmail(email);
   if(!isExistingUser){
        const err = new Error("Invalid credentials");
        err.status = 401;
        throw err;
   }
    
    const match = await bcrypt.compare(password,isExistingUser.password_hash);
    if(match == false){
        const err = new Error("Invalid credentials");
        err.status = 401;
        throw err;
    }
    

    const token = jwt.sign(
    {userId: isExistingUser.id,email: isExistingUser.email},
    process.env.JWT_SECRET,
    {expiresIn: "7d"}
   )

   return token;

}

module.exports = {register,login};