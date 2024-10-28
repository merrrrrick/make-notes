var jwt = require("jsonwebtoken");
const JWT_SECRET = "bigdaddy$$";

const fetchuser = (req, res, next) => {
    // GET the user from the JWT token and add id to req object
    const token = req.header('auth-token');
    
    // If no token is found in the header
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        // Verify the token and extract user data
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;  // Add user id to request object
        next();  // Move to the next middleware or route handler
    } catch (error) {
        // If token verification fails
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchuser;
