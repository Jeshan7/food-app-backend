const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "Hello Jeshan");
    // process.env.JWT_SECRET_KEY
    req.currentUser = decoded.email;
    next();
  } catch(err) {
    res.status(401).json({
        Error: err.message
    })
  }
    
}