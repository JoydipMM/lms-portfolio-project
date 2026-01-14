import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { User } from "../models/user.model";

/**
 * @desc    Get logged-in user profile
 * @route   GET /api/users/me
 * @access  Private
 */
export const getMyProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    const user = await User.findById(userId).select("-passwordHash");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

/**
 * @desc    Get all users (Admin)
 * @route   GET /api/users
 * @access  Private (Admin)
 */
export const getAllUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await User.find().select("-passwordHash");

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/**
 * @desc    Update user role
 * @route   PATCH /api/users/:id/role
 * @access  Private (Admin)
 */
export const updateUserRole = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const allowedRoles = ["STUDENT", "INSTRUCTOR", "ADMIN"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("-passwordHash");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update role" });
  }
};

/**
 * @desc    Deactivate user account
 * @route   PATCH /api/users/:id/deactivate
 * @access  Private (Admin)
 */
export const deactivateUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    ).select("-passwordHash");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User deactivated successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to deactivate user" });
  }
};
