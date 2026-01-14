import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/rbac.middleware";

import {
  getMyProfile,
  getAllUsers,
  updateUserRole,
  deactivateUser
} from "../controllers/user.controller";

const router = express.Router();

/**
 * @route   GET /api/users/me
 * @desc    Get logged-in user profile
 * @access  Private (Any authenticated user)
 */
router.get(
  "/me",
  authenticate,
  getMyProfile
);

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Private (Admin only)
 */
router.get(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  getAllUsers
);

/**
 * @route   PATCH /api/users/:id/role
 * @desc    Update user role
 * @access  Private (Admin only)
 */
router.patch(
  "/:id/role",
  authenticate,
  authorize(["ADMIN"]),
  updateUserRole
);

/**
 * @route   PATCH /api/users/:id/deactivate
 * @desc    Deactivate user account
 * @access  Private (Admin only)
 */
router.patch(
  "/:id/deactivate",
  authenticate,
  authorize(["ADMIN"]),
  deactivateUser
);

export default router;
