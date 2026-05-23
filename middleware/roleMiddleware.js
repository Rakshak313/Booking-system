export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      // req.user comes from JWT middleware
      if (!req.user) {
        return res.status(401).json({
          message: "Not authorized",
        });
      }

      // Check role
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Access denied: insufficient permissions",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
};