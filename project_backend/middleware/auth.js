const jwt = require("jsonwebtoken");
const config = require("config");
const student = require("../models/DH_models/student");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decode = jwt.verify(token, "jwtSecret");
    const Std = await student.findOne({ _id: decode._id, "tokens.token": token });
    if (!Std) {
      throw new Error("Please Authenticate");
    }
    req.token = token;
    req.Std = Std;
    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
    console.log("Error in auth.js middleware ", error.message);
  }
};

module.exports = auth;