import { Schema, model, Types, Document } from "mongoose";

export type CourseStatus = "DRAFT" | "PUBLISHED";

export interface ICourse extends Document {
  title: string;
  description: string;
  instructor: Types.ObjectId;
  price: number;
  isPaid: boolean;
  status: CourseStatus;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    price: {
      type: Number,
      default: 0
    },

    isPaid: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED"],
      default: "DRAFT"
    },

    thumbnail: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Course = model<ICourse>("Course", courseSchema);

export default Course;
