const jwt = require("jsonwebtoken");
const config = require("config");
const staff = require("../../models/RS_models/staff");
 
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decode = jwt.verify(token, "jwtSecret");
    const staff1 = await staff.findOne({ _id: decode._id, "tokens.token": token });
    if (!staff1) {
      throw new Error("Please Authenticated");
    }
    req.token = token;
    req.staff1 = staff1;
    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
    console.log("Error in auth.js middleware ", error.message);
  }
};
 
module.exports = auth;
 

