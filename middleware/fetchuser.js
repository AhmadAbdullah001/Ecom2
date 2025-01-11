const jwt = require('jsonwebtoken');
const JWT_SECRET='Abdullahisgood$oy'

const fetchuser = (req, res, next) => {
  // Get the token from the header
  const token = req.header('auth-token');

  // If no token is provided, send an error response
  if (!token) {
    return res.status(401).send({ error: "No token provided" });
  }

  try {
    // Verify the token and attach the user to the request object
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next(); // Proceed to the next middleware or route
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
