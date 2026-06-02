 
 const jwt = require("jsonwebtoken");
 
 const  authMiddleware = (req,res,next) => { try{
    const authHeader = req.headers.authorization;
    if(!authHeader){
      const err = new Error("No token was found");
      err.status = 401;
      throw err;
    }
    const check = authHeader.split(" ");
    if(check.length !== 2 || check[0] !== "Bearer"){
      const err = new Error("Invalid authHeader");
      err.status = 400;
      throw err;
    }
    const token = check[1];

    try{
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
      req.user = decoded;
      next();
    }catch{
        const err = new Error("Invalid or expired token");
        err.status = 401;
        throw err;
    }


  }catch(err){
     next(err);
  }
}

module.exports = authMiddleware;
