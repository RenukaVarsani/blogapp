const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {

  try {
    
    const token = req.headers.authorization.split(" ")[1];
    if(isTokenExpired(token) ===  true){
      return res.status(419).send()
    }
    
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = await User.findOne({
      _id: decoded._id
    });
    console.log(user);
    if (!user) {
      res.status(400).json({ msg: "User not found" })
    }

    req.token = token;
    req.user = user;

    if (user.role === "admin") {
      next();
    }
    else if (user.role === "writer") {
      res.status(200).send({ message: "you can write blogs" })
    }
    else {
      res.status(403).send({ error: "Can`t access to this route" });
    }
  } catch (e) {

    res.status(401).send({ error: "Please authenticate." });
  }
}



module.exports = auth;


isTokenExpired= (token)=>{
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN)
    const expiritionTime = payload.exp
    const currentTime = Math.floor(Date.now() / 1000)
    return expiritionTime < currentTime
  } catch (error) {
    return true
  }

}