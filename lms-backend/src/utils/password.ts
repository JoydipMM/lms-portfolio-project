import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Hash a plain text password
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare plain password with hashed password
 */
export const comparePassword = async (
  password: string,
  passwordHash: string
): Promise<boolean> => {
  return bcrypt.compare(password, passwordHash);
};
