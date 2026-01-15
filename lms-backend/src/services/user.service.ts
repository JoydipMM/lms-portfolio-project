import User from "../models/user.model";
import { hashPassword } from "../utils/password";

type UserRole = "STUDENT" | "INSTRUCTOR" | "ADMIN";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

interface UpdateProfileInput {
  name?: string;
  email?: string;
}

export class UserService {

  /**
   * Create user (used by Admin or internally)
   */
  static async createUser(data: CreateUserInput) {
    const { name, email, password, role = "STUDENT" } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const passwordHash = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      passwordHash,
      role,
      isActive: true
    });

    return UserService.sanitizeUser(user);
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: string) {
    const user = await User.findById(userId).select("-passwordHash");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  /**
   * Get logged-in user profile
   */
  static async getProfile(userId: string) {
    const user = await User.findById(userId).select("-passwordHash");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  /**
   * Update logged-in user profile
   */
  static async updateProfile(userId: string, data: UpdateProfileInput) {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true }
    ).select("-passwordHash");

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  /**
   * Admin: Get all users
   */
  static async getAllUsers() {
    return User.find().select("-passwordHash");
  }

  /**
   * Admin: Activate / Deactivate user
   */
  static async setUserStatus(userId: string, isActive: boolean) {
    const user = await User.findByIdAndUpdate(
      userId,
      { isActive },
      { new: true }
    ).select("-passwordHash");

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  /**
   * Remove sensitive fields before returning user
   */
  private static sanitizeUser(user: any) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt
    };
  }
}
