import { Router } from "express";
import { SectionController } from "../controllers/section.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/rbac.middleware";

const router = Router();

// Create section - only INSTRUCTOR or ADMIN
router.post(
  "/",
  authenticate,
  authorize(["INSTRUCTOR", "ADMIN"]),
  SectionController.createSection
);

// Get all sections of a course (public)
router.get(
  "/course/:courseId",
  SectionController.getSectionsByCourse
);

export default router;