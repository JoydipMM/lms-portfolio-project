import { Schema, model, Types } from "mongoose";

export interface ISection {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  course: Types.ObjectId;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sectionSchema = new Schema<ISection>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    order: {
      type: Number,
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Indexing for performance
 * - Load sections by course
 * - Sort by order
 */
sectionSchema.index({ course: 1, order: 1 });

export const Section = model<ISection>("Section", sectionSchema);
