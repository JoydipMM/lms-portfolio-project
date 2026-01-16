import { Request, Response } from "express";
import { SectionService } from "../services/section.service";
import { successResponse, errorResponse } from "../utils/response";

export class SectionController {
  static async createSection(req: Request, res: Response) {
    try {
      // Assuming req.user.id contains the instructor's user id
      const instructorId = (req as any).user.id;

      const section = await SectionService.createSection(instructorId, req.body);

      return successResponse(res, 201, "Section created successfully", section);
    } catch (error: any) {
      return errorResponse(res, 400, error.message || "Failed to create section");
    }
  }

  static async getSectionsByCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.courseId;
      const sections = await SectionService.getSectionsByCourse(courseId);

      return successResponse(res, 200, "Sections fetched successfully", sections);
    } catch (error: any) {
      return errorResponse(res, 500, error.message || "Failed to fetch sections");
    }
  }

  // Add other methods like update, delete if needed
}