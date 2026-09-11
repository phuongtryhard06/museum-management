const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'baotang_heritage_ai_secret_key_2026';

/**
 * Middleware: Verify JWT Token
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Yêu cầu Token xác thực header Authorization!' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Token không hợp lệ hoặc đã hết hạn!' });
  }
}

/**
 * Middleware: Role-Based Access Control (RBAC)
 */
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Truy cập bị từ chối! Chức năng này yêu cầu quyền: ${allowedRoles.join(', ')}` 
      });
    }
    next();
  };
}

module.exports = {
  verifyToken,
  authorizeRoles,
  JWT_SECRET
};
