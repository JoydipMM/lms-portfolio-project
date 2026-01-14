import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import bcrypt from "bcryptjs";

// import authRoutes from "./routes/auth.routes";
// import courseRoutes from "./routes/course.routes";
import userRoutes from "./routes/user.routes";
// import adminRoutes from "./routes/admin.routes";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); // Parse JSON bodies





const hash = bcrypt.hash("password123", 10);
console.log("fffff ",hash);

// Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/admin", adminRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the API" });
});

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

export default app;
