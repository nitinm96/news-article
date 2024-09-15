const jwt = require("jsonwebtoken");

const validateTokenHandler = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.authorization; // Use lowercase 'authorization'

    // Check if Authorization header is present and starts with 'Bearer'
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'
      // Verify the token
      jwt.verify(token, process.env.ACCESS_TOKEN_SECECT, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Token is not valid" });
        }

        // If token is valid, store decoded user info in request object
        req.user = decoded.user;
        next();
      });
    } else {
      // No Authorization header or token present
      return res.status(401).json({ error: "Unauthorized, no token provided" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = validateTokenHandler;
