import { Request, Response } from "express";
import { CourseService } from "../services/course.service";
import { successResponse, errorResponse } from "../utils/response";

export class CourseController {

  /**
   * Public: Get all published courses
   */
  static async getPublishedCourses(req: Request, res: Response) {
    try {
      const courses = await CourseService.getPublishedCourses();

      return successResponse(
        res,
        200,
        "Courses fetched successfully",
        courses
      );
    } catch (error: any) {
      return errorResponse(
        res,
        500,
        error.message || "Failed to fetch courses"
      );
    }
  }

  /**
   * Public: Get course by ID
   */
  static async getCourseById(req: Request, res: Response) {
    try {
      const course = await CourseService.getCourseById(req.params.id);

      return successResponse(
        res,
        200,
        "Course fetched successfully",
        course
      );
    } catch (error: any) {
      return errorResponse(
        res,
        404,
        error.message || "Course not found"
      );
    }
  }

  /**
   * Instructor/Admin: Create course
   */
  static async createCourse(req: Request, res: Response) {
    try {
      const instructorId = (req as any).user.id;

      const course = await CourseService.createCourse(
        instructorId,
        req.body
      );

      return successResponse(
        res,
        201,
        "Course created successfully",
        course
      );
    } catch (error: any) {
      return errorResponse(
        res,
        400,
        error.message || "Failed to create course"
      );
    }
  }

  /**
   * Instructor/Admin: Update course
   */
  static async updateCourse(req: Request, res: Response) {
    try {
      const instructorId = (req as any).user.id;

      const course = await CourseService.updateCourse(
        req.params.id,
        instructorId,
        req.body
      );

      return successResponse(
        res,
        200,
        "Course updated successfully",
        course
      );
    } catch (error: any) {
      return errorResponse(
        res,
        403,
        error.message || "Failed to update course"
      );
    }
  }

  /**
   * Instructor/Admin: Publish course
   */
  static async publishCourse(req: Request, res: Response) {
    try {
      const instructorId = (req as any).user.id;

      const course = await CourseService.publishCourse(
        req.params.id,
        instructorId
      );

      return successResponse(
        res,
        200,
        "Course published successfully",
        course
      );
    } catch (error: any) {
      return errorResponse(
        res,
        403,
        error.message || "Failed to publish course"
      );
    }
  }

  /**
   * Admin: Delete course
   */
  static async deleteCourse(req: Request, res: Response) {
    try {
      await CourseService.deleteCourse(req.params.id);

      return successResponse(
        res,
        200,
        "Course deleted successfully"
      );
    } catch (error: any) {
      return errorResponse(
        res,
        400,
        error.message || "Failed to delete course"
      );
    }
  }
}
