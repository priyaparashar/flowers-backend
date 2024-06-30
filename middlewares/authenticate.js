
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed. Token not provided.' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ message: 'Authentication failed. Invalid token.' });
      }
      
      req.userId = decodedToken.userId;
      next();
    });
  };
    