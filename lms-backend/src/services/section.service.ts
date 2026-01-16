import { Section, ISection } from "../models/section.model";
import Course from "../models/course.model";
import mongoose from "mongoose";

export class SectionService {
  /**
   * Create a new section under a course
   * @param instructorId - ID of the instructor creating the section
   * @param data - Section data (title, description, order, course, isPublished)
   * @returns created Section document
   */
  static async createSection(
    instructorId: string,
    data: Partial<ISection>
  ): Promise<ISection> {
    // Validate course ownership
    const course = await Course.findById(data.course);
    if (!course) {
      throw new Error("Course not found");
    }

    if (course.instructor.toString() !== instructorId) {
      throw new Error("Unauthorized: You do not own this course");
    }

    // Optional: Auto-calculate order if not provided
    if (!data.order) {
      const lastSection = await Section.findOne({ course: data.course })
        .sort({ order: -1 })
        .exec();
      data.order = lastSection ? lastSection.order + 1 : 1;
    }

    // Create and save new section
    const section = new Section({
      title: data.title,
      description: data.description || "",
      course: data.course,
      order: data.order,
      isPublished: data.isPublished ?? false,
    });

    await section.save();

    return section;
  }

  /**
   * Get all sections of a course, sorted by order
   * @param courseId - Course ID
   * @returns Array of Section documents
   */
  static async getSectionsByCourse(courseId: string): Promise<ISection[]> {
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      throw new Error("Invalid course ID");
    }

    const sections = await Section.find({ course: courseId })
      .sort({ order: 1 })
      .exec();

    return sections;
  }

  // Add update, delete, publish methods as needed
}