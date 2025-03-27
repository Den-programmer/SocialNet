const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  dotenv.config()

  const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '7d' })
    req.user = decoded.userId
    
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevents XSS attacks
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' // prevents CSRF attacks
    })
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}

module.exports = { verifyToken }