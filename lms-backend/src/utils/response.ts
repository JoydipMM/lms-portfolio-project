import { Response } from "express";

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

/**
 * Success response helper
 */
export const successResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data
  };

  return res.status(statusCode).json(response);
};

/**
 * Error response helper
 */
export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  error?: any
) => {
  const response: ApiResponse = {
    success: false,
    message,
    error
  };

  return res.status(statusCode).json(response);
};
