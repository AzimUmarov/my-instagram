const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign(user, "4444", { expiresIn: '15s' })
}
  
function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15s' })
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
}