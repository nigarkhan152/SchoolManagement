import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },

    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, "Gender is required"],
    },

    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },

    photo: {
      type: String,
      default: "",
    },

    department: {
      type: String,
      ref: "Department",
      required: [true, "Department is required"],
    },

    qualification: {
      type: String,
      required: [true, "Qualification is required"],
      trim: true,
    },

    experience: {
      type: Number,
      required: [true, "Experience is required"],
      min: 0,
    },

    joiningDate: {
      type: Date,
      required: [true, "Joining date is required"],
    },

    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: 0,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      unique: true,
      match: [/^[6-9]\d{9}$/, "Invalid phone number"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Invalid email"],
    },

    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
      pincode: {
        type: String,
        trim: true,
      },
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "On Leave"],
      default: "Active",
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

/* ==========================
   Indexes
========================== */

teacherSchema.index(
  { employeeId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  }
);

teacherSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  }
);

teacherSchema.index(
  { phone: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  }
);

teacherSchema.index({ firstName: 1 });

teacherSchema.index({ lastName: 1 });

teacherSchema.index({ department: 1 });

teacherSchema.index({ status: 1 });

teacherSchema.index({ isDeleted: 1 });

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;