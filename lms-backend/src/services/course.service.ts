import Course from "../models/course.model";
import { Types } from "mongoose";

interface CreateCourseInput {
  title: string;
  description: string;
  price?: number;
  thumbnail?: string;
}

export class CourseService {

  /**
   * Public: Get all published courses
   */
  static async getPublishedCourses() {
    return Course.find({ status: "PUBLISHED" })
      .populate("instructor", "name email")
      .sort({ createdAt: -1 });
  }

  /**
   * Public: Get course by ID
   */
  static async getCourseById(courseId: string) {
    if (!Types.ObjectId.isValid(courseId)) {
      throw new Error("Invalid course ID");
    }

    const course = await Course.findById(courseId)
      .populate("instructor", "name email");

    if (!course) {
      throw new Error("Course not found");
    }

    if (course.status !== "PUBLISHED") {
      throw new Error("Course not published");
    }

    return course;
  }

  /**
   * Instructor/Admin: Create course
   */
  static async createCourse(
    instructorId: string,
    data: CreateCourseInput
  ) {
    const course = await Course.create({
      ...data,
      instructor: instructorId,
      isPaid: data.price && data.price > 0
    });

    return course;
  }

  /**
   * Instructor/Admin: Update course
   */
  static async updateCourse(
    courseId: string,
    instructorId: string,
    data: Partial<CreateCourseInput>
  ) {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Ownership check
    if (course.instructor.toString() !== instructorId) {
      throw new Error("Not authorized to update this course");
    }

    Object.assign(course, data);
    await course.save();

    return course;
  }

  /**
   * Instructor/Admin: Publish course
   */
  static async publishCourse(
    courseId: string,
    instructorId: string
  ) {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Ownership check
    if (course.instructor.toString() !== instructorId) {
      throw new Error("Not authorized to publish this course");
    }

    course.status = "PUBLISHED";
    await course.save();

    return course;
  }

  /**
   * Admin: Delete course
   */
  static async deleteCourse(courseId: string) {
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      throw new Error("Course not found");
    }
  }
}
