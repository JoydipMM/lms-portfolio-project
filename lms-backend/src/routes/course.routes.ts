import { Router } from "express";
import { CourseController } from "../controllers/course.controller";
import { authenticate } from "../middlewares/auth.middleware";
import {authorize} from "../middlewares/rbac.middleware";

const router = Router();

/**
 * Public routes
 */
router.get("/", CourseController.getPublishedCourses);
router.get("/:id", CourseController.getCourseById);

/**
 * Instructor routes
 */
router.post(
  "/",
  authenticate,
  authorize(["INSTRUCTOR", "ADMIN"]),
  CourseController.createCourse
);

router.put(
  "/:id",
  authenticate,
  authorize(["INSTRUCTOR", "ADMIN"]),
  CourseController.updateCourse
);

router.patch(
  "/:id/publish",
  authenticate,
  authorize(["INSTRUCTOR", "ADMIN"]),
  CourseController.publishCourse
);

/**
 * Admin routes
 */
router.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  CourseController.deleteCourse
);

export default router;
