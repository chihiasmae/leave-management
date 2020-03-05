/**
 * @author MBE
 */
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, config.secret);
    next();
  } catch (err) {
    //console.log("middleware err", err);
    res.status(401).json({ message: "Auth failed!" });
  }
};
