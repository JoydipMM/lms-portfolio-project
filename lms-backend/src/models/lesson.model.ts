import mongoose, { Schema, model, Types } from "mongoose";

export interface ILesson {
  //_id: Types.ObjectId;
  title: string;
  description?: string;
  course: Types.ObjectId;
  section: Types.ObjectId;
  order: number;
  videoUrl?: string;
  duration?: number; // in seconds
  isPreview: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const lessonSchema = new Schema<ILesson>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String
    },

    course: {
      type: Types.ObjectId,
      ref: "Course",
      required: true,
      index: true
    },

    section: {
      type: Types.ObjectId,
      ref: "Section",
      required: true,
      index: true
    },

    order: {
      type: Number,
      required: true
    },

    videoUrl: {
      type: String
    },

    duration: {
      type: Number
    },

    isPreview: {
      type: Boolean,
      default: false
    },

    isPublished: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

lessonSchema.index({ course: 1, section: 1, order: 1 });

export const Lesson = model<ILesson>("Lesson", lessonSchema);

export default Lesson;