import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: "STUDENT" | "INSTRUCTOR" | "ADMIN";
}

interface LoginInput {
  email: string;
  password: string;
}

export class AuthService {

  static async register(data: RegisterInput) {
    const { name, email, password, role = "STUDENT" } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
      role,
      isActive: true
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  }

  static async login(data: LoginInput) {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (!user.isActive) {
      throw new Error("Account is disabled");
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }
}
