const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  dotenv.config()

  const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.userId
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}

module.exports = { verifyToken }