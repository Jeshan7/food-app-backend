const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req,currentUser = decoded;
  } catch(err) {
    res.status(401).json({
        Error: err.message
    })
  }
    
}