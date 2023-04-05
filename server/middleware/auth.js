const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {  

  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "crud");
    const user = await User.findOne({
      _id: decoded._id
    });

    if (!user) {
      res.status(400).json({msg: "User not found"})
    }

    req.token = token;
    req.user = user;

    if (user.role === "admin" ) {
      next();
    } 
    else if(user.role === "writer" ){
      res.status(200).send({message:"you can write blogs"})
    }
    else {
      res.status(403).send({ error: "Can`t access to this route" });
    }
      } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
