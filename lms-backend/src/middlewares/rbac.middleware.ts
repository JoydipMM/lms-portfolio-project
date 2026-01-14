import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

/**
 * RBAC middleware
 * @param allowedRoles - array of allowed roles
 */
export const authorize =
  (allowedRoles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: insufficient permissions"
      });
    }

    next();
  };
