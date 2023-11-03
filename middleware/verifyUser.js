const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyUser = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;
  const bearerToken = token.split(' ')
  const Token = bearerToken[1]

  if (Token) {
    // Calculate the expiration time, which is one day from the current time
    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 60 seconds * 60 minutes * 24 hours

    // Create the token with the expiration time
    jwt.verify(Token, process.env.Token , (err, user) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.status(403).json({ message: 'Invalid token' });
      }

      // Check if the token has expired
      if (user.exp <= expirationTime) {
        return res.status(403).json({ message: 'Token has expired' });
      }

      console.log("token validated successfully")
      


      // If the token is valid and not expired, you can attach the user data to the request object
      req.user = user;

      // console.log(req.user)
      next(); // Continue to the next middleware or route handler
    });
  } else {
    // Handle the case where no token is provided with a 401 status (Unauthorized)
    res.status(401).json({ message: 'Token not provided' });
  }
};

module.exports = verifyUser;
