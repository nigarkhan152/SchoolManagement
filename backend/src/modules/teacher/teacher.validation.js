const Joi = require("joi");

const createTeacherSchema = Joi.object({
  employeeId: Joi.string().trim().required().messages({
    "string.empty": "Employee ID is required",
    "any.required": "Employee ID is required",
  }),

  firstName: Joi.string().trim().required().messages({
    "string.empty": "First name is required",
    "any.required": "First name is required",
  }),

  lastName: Joi.string().trim().required().messages({
    "string.empty": "Last name is required",
    "any.required": "Last name is required",
  }),

  gender: Joi.string()
    .valid("Male", "Female", "Other")
    .required()
    .messages({
      "any.only": "Gender must be Male, Female or Other",
      "any.required": "Gender is required",
    }),

  dateOfBirth: Joi.date().required().messages({
    "date.base": "Invalid Date of Birth",
    "any.required": "Date of Birth is required",
  }),

  photo: Joi.string().allow("", null),

  department: Joi.string().trim().required().messages({
    "string.empty": "Department is required",
    "any.required": "Department is required",
  }),

  qualification: Joi.string().trim().required().messages({
    "string.empty": "Qualification is required",
    "any.required": "Qualification is required",
  }),

  experience: Joi.number().min(0).required().messages({
    "number.base": "Experience must be a number",
    "number.min": "Experience cannot be negative",
    "any.required": "Experience is required",
  }),

  joiningDate: Joi.date().required().messages({
    "date.base": "Invalid Joining Date",
    "any.required": "Joining Date is required",
  }),

  salary: Joi.number().min(0).required().messages({
    "number.base": "Salary must be a number",
    "number.min": "Salary cannot be negative",
    "any.required": "Salary is required",
  }),

  phone: Joi.string().trim().required().messages({
    "string.empty": "Phone number is required",
    "any.required": "Phone number is required",
  }),

  email: Joi.string().email().trim().required().messages({
    "string.email": "Invalid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),

  address: Joi.object({
    street: Joi.string().allow("", null),
    city: Joi.string().allow("", null),
    state: Joi.string().allow("", null),
    country: Joi.string().allow("", null),
    pincode: Joi.string().allow("", null),
  }).optional(),

  status: Joi.string()
    .valid("Active", "Inactive", "On Leave")
    .default("Active"),
});

const updateTeacherSchema = createTeacherSchema.fork(
  [
    "employeeId",
    "firstName",
    "lastName",
    "gender",
    "dateOfBirth",
    "department",
    "qualification",
    "experience",
    "joiningDate",
    "salary",
    "phone",
    "email",
  ],
  (schema) => schema.optional()
);

module.exports = {
  createTeacherSchema,
  updateTeacherSchema,
};