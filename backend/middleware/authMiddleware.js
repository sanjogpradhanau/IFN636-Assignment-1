const jwt = require('jsonwebtoken');

// default export: Express middleware that verifies JWT and sets req.user
module.exports = function auth(req, res, next) {
  const hdr = req.headers.authorization || '';
  const [scheme, token] = hdr.split(' ');
  if (!token || !/^Bearer$/i.test(scheme)) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id || decoded._id || decoded.userId || decoded.sub };
    if (!req.user.id) return res.status(401).json({ message: 'Invalid token payload' });
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid/expired token' });
  }
};
