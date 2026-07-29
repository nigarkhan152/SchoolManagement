import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    name: {
      type: String,
      required: [true, "Section name is required"],
      trim: true,
      uppercase: true,
    },

    capacity: {
      type: Number,
      default: 40,
      min: 1,
    },

    classMonitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

sectionSchema.index(
  {
    classId: 1,
    name: 1,
  },
  {
    unique: true,
  }
);

const Section = mongoose.model("Section", sectionSchema);

export default Section;